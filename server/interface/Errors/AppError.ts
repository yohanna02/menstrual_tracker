import CustomError from "./CustomError";

export default class AppError extends CustomError {
    statusCode = 400;
    errorType = "APP_ERROR";

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