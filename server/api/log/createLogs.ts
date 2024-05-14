import { Mood, User } from "@prisma/client";
import { Request, Response } from "express";
import db from "../../db";

interface Log {
    month: number;
    mood: Mood;
}

export default async function (req: Request, res: Response) {
    const user = res.locals.user as User;
    const body = req.body as Log;

    const month = new Date(body.month);
    month.setHours(1, 0, 0, 0);

    const logs = await db.logs.findUnique({ where: { month, userId: user.id } });
    console.log(body.month)
    console.log(month)

    if (logs) {
        await db.logs.update({
            where: { month: month, userId: user.id },
            data: { mood: body.mood }
        });
    } else {
        await db.logs.create({
            data: {
                month: month,
                userId: user.id,
                mood: body.mood
            }
        });
    }

    res.json({ message: "Logged successfully" });
}