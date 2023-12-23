import { HttpStatusCode } from "../consts/HttpStatusCodes";

class AppError extends Error {
    public readonly name: string;
    public readonly isOperational: boolean;
    public readonly httpStatusCode: HttpStatusCode;

    constructor(name: string, description: string, isOperational: boolean, httpCode: HttpStatusCode) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.isOperational = isOperational;
        this.httpStatusCode = httpCode;

        Error.captureStackTrace(this);
    }
}

export default AppError;
