import { ValidationError } from "./ValidationError";
export declare class ValidationErrorsError extends Error {
    errors: ValidationError[];
    constructor(errors: ValidationError[]);
    toString(): string;
}
