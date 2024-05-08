import { Request, Response } from "express";
import db from "../../db";
import { User } from "@prisma/client";
import AppError from "../../interface/Errors/AppError";

export default function getCycle(req: Request, res: Response) {
    const user = res.locals.user as User;

    if (!user.averageCycleLength || !user.averagePeriodLength) {
        throw new AppError("User has no menstrual cycle");
    }

    const queryParams = req.query as { today: string };
    const today = new Date(parseInt(queryParams.today));


}