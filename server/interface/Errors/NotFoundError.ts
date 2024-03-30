import CustomError from "./CustomError";

export default class AppError extends CustomError {
    statusCode = 404;
    errorType = "NOT_FOUND";

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, AppError.prototype);
    }

    serializeErrors() {
        return {
            statusCode: this.statusCode,
            errorType: this.errorType,
            message: this.message
        }
    }
};