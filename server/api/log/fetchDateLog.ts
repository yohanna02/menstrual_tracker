import { User } from "@prisma/client";
import { Request, Response } from "express";
import db from "../../db";
import MoodData from "../../interface/MoodData";

export default async function(req: Request, res: Response) {
    const user = res.locals.user as User;

    const date = new Date(req.query.date as string);
    date.setHours(1, 0, 0, 0);

    const log = await db.logs.findFirst({
        where: {
            month: date,
            userId: user.id
        }
    });

    if (!log) {
        return res.json({index: -1});
    }
    
    let index = 0;
    for (const mood in MoodData) {
        
        if (mood === log.mood) {
            return res.json({ index });
        }
        index++;
    }
    
    return res.json({index: -1});
}