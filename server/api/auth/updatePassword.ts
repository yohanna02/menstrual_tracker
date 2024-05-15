import { User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import db from "../../db";
import ValidationError from "../../interface/Errors/ValidationError";
import AuthError from "../../interface/Errors/AuthError";

const schema = z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(6)
});

export default async function (req: Request, res: Response) {
    const user = res.locals.user as User;

    const { oldPassword, newPassword } = req.body;

    const validationResponse = schema.safeParse({ oldPassword, newPassword });
    if (!validationResponse.success) {
        throw new ValidationError("Invalid data", validationResponse.error.issues);
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
        throw new AuthError("Invalid password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
    });

    res.json({ message: "Password updated" });
}