import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../db";
import AppError from "../../interface/Errors/AppError";
import ValidationError from "../../interface/Errors/ValidationError";

dotenv.config();

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function SignupController(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await db.user.findUnique({
        where: {
            email
        }
    });

    if (user) throw new AppError("User already exists");

    const validationResponse = signupSchema.safeParse(req.body);
    if (!validationResponse.success) throw new ValidationError("Invalid data", validationResponse.error.issues);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
        data: {
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            email: true
        }
    });

    const token = jsonwebtoken.sign({ id: newUser.id }, JWT_SECRET);

    res.status(201).json({
        message: "User created successfully",
        data: newUser,
        token
    });
}