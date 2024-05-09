import { Request, Response } from "express";
import { z } from "zod";
import ValidationError from "../../interface/Errors/ValidationError";
import { MenstrualCycle, User } from "@prisma/client";
import db from "../../db";
import AppError from "../../interface/Errors/AppError";

const onboardingSchema = z.object({
    name: z.string(),
    periodLength: z.number(),
    cycleLength: z.number(),
    lastPeriodDate: z.number()
});

export default async function onboarding(req: Request, res: Response) {
    let { name, periodLength, cycleLength, lastPeriodDate } = req.body;

    const validationResponse = onboardingSchema.safeParse(req.body);
    if (!validationResponse.success) {
        throw new ValidationError("Invalid data", validationResponse.error.issues);
    }

    const loggedInUser = res.locals.user as User;
    const userExists = await db.user.findUnique({
        where: {
            id: loggedInUser.id
        }
    });

    if (!userExists) {
        throw new AppError("User not found");
    }

    await db.user.update({
        where: {
            id: loggedInUser.id
        },
        data: {
            name,
            averageCycleLength: cycleLength,
            averagePeriodLength: periodLength
        }
    });

    const cycles: Partial<MenstrualCycle>[] = [];
    // generate cycle data
    for (let j = 0; j < 12; j++) {
        // full day timestamp
        const fullDateTimestamp = 86400000;

        const bleedingDatesString: string[] = [];
        for (let i = 0; i < periodLength; i++) {
            bleedingDatesString.push(convertDateToString(lastPeriodDate + (i * fullDateTimestamp)));
        }

        const ovulationDate = (lastPeriodDate + (13 * fullDateTimestamp)) - (fullDateTimestamp * 2);
        const ovulationDatesString: string[] = [];
        for (let i = 0; i < 5; i++) {
            ovulationDatesString.push(convertDateToString(ovulationDate + (i * fullDateTimestamp)));
        }

        const lastBleedingDay = getDateTimeStamp(bleedingDatesString[bleedingDatesString.length - 1]);
        const fertileDatesString: string[] = [];
        let i = 1;
        while (true) {
            fertileDatesString.push(convertDateToString(lastBleedingDay + (i * fullDateTimestamp)));
            i++;

            if (fertileDatesString[fertileDatesString.length - 1] === ovulationDatesString[0]) {
                break;
            }
        }

        const cycle: Partial<MenstrualCycle> = {
            bleedingDates: bleedingDatesString,
            ovulationDates: ovulationDatesString,
            fertileDates: fertileDatesString,
            userId: loggedInUser.id,
        };
        cycles.push(cycle);
        lastPeriodDate = lastPeriodDate + fullDateTimestamp * cycleLength;
    }

    await db.menstrualCycle.createMany({
        data: cycles
    });

    const cyclesData = await db.menstrualCycle.findMany({
        where: { userId: loggedInUser.id },
        select: {
            bleedingDates: true,
            ovulationDates: true,
            fertileDates: true
        }
    });

    res.status(201).json({
        name,
        cycles: cyclesData
    });
}

function getDateTimeStamp(date: string): number {
    return new Date(date).getTime();
}

function convertDateToString(date: number): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}