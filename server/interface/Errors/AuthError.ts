import CustomError from "./CustomError";

export default class AuthError extends CustomError {
    statusCode = 401;
    errorType = "AUTH_ERROR";

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, AuthError.prototype);
    }

    serializeErrors() {
        return {
            statusCode: this.statusCode,
            errorType: this.errorType,
            message: this.message
        }
    }
};