import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import db from "../../db";
import AuthError from "../../interface/Errors/AuthError";
import { on } from "events";

dotenv.config();

export default async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await db.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        throw new AuthError("Email or password is incorrect");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new AuthError("Email or password is incorrect");
    }

    const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET!);

    const cyclesData = await db.menstrualCycle.findMany({
        where: {
            userId: user.id
        },
        select: {
            bleedingDates: true,
            fertileDates: true,
            ovulationDates: true
        }
    });

    res.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        },
        onboardingCompleted: user.name !== null && user.averageCycleLength !== null && user.averagePeriodLength !== null,
        cycles: cyclesData
    });
}