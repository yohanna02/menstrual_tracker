import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import prisma from "../db";
import AuthError from "../interface/Errors/AuthError";

export default async function(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AuthError("Invalid Request");
    }

    const decoded: any = jsonwebtoken.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      throw new AuthError("Invalid Request");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      }
    });
    
    if (!user) {
      throw new AuthError("Invalid Request");
    }

    res.locals.user = user;
    next();
  } catch(err) {
    throw new AuthError("Invalid Request");
  }
}