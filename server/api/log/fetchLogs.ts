import { User } from "@prisma/client";
import { Request, Response } from "express";
import db from "../../db";
import MoodData from "../../interface/MoodData";

export default async function (req: Request, res: Response) {
    const user = res.locals.user as User;

    const date = new Date(req.query.date as string);
    date.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const moodData = await db.logs.groupBy({
        by: ["mood"],
        _count: {
            mood: true
        },
        where: {
            month: {
                gte: startOfMonth,
                lte: endOfMonth
            },
            userId: user.id
        }
    });

    const data = moodData.map((data) => ({
        name: data.mood,
        count: data._count.mood,
        color: MoodData[data.mood].color,
        legendFontColor: MoodData[data.mood].color,
        legendFontSize: 10
    }));

    res.json(data);
    



    // res.json(logs);
}