import CustomError from "./CustomError";
import { ZodIssue } from "zod";

class ValidationError extends CustomError {
    statusCode = 422;
    errorType = "VALIDATION_ERROR";
    errorDetails: ZodIssue[];

    constructor(message: string, errorDetails: ZodIssue[]) {
        super(message);
        this.errorDetails = errorDetails;

        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    serializeErrors() {
        return {
            statusCode: this.statusCode,
            errorType: this.errorType,
            message: this.message,
            errorDetails: this.errorDetails
        }
    }
}

export default ValidationError;