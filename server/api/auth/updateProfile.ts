import { User } from "@prisma/client";
import { Request, Response } from "express";
import {z} from "zod";
import db from "../../db";
import ValidationError from "../../interface/Errors/ValidationError";

const schema = z.object({
    name: z.string(),
    email: z.string().email()
});

export default async function(req: Request, res: Response) {
    const user = res.locals.user as User;

    const { name, email } = req.body;

    const validationResponse = schema.safeParse({ name, email });
    if (!validationResponse.success) {
        throw new ValidationError("Invalid data", validationResponse.error.issues);
    }

    await db.user.update({
        where: { id: user.id },
        data: { name, email }
    });

    res.json({ message: "Profile updated" });
}