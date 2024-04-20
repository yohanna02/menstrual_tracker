import { Request, Response } from "express";
import { z } from "zod";
import ValidationError from "../../interface/Errors/ValidationError";
import { User } from "@prisma/client";
import db from "../../db";
import AppError from "../../interface/Errors/AppError";

const onboardingSchema = z.object({
    name: z.string(),
    periodLength: z.number(),
    cycleLength: z.number(),
    lastPeriodDate: z.number()
});

export default async function onboarding(req: Request, res: Response) {
    const { name, periodLength, cycleLength, lastPeriodDate } = req.body;

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
            menstrualCycle: {
                startDate: new Date(lastPeriodDate),
                averageCycleLength: cycleLength,
                averagePeriodLength: periodLength
            }
        }
    });

    res.status(201).json({
        message: "Onboarding completed successfully",
        name
    });
}