import { Request, Response, NextFunction } from "express";
import CustomError from "../interface/Errors/CustomError";

export const errorLogger = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "development")
        console.error(`💥 Error -> ${error.message}`);
    next(error);
};

export const errorResponder = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeErrors());
        return;
    }

    res.status(500).json({
        statusCode: 500,
        errorType: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error"
    });
}

export const invalidPathHandler = (req: Request, res: Response) => {
    res.status(404).json({
        statusCode: 404,
        errorType: "INVALID_PATH",
        message: "Invalid Path"
    });
};