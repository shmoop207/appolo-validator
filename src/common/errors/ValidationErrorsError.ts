import {Strings} from "@appolo/utils";
import {ValidationError} from "./ValidationError";

export class ValidationErrorsError extends Error {

    constructor(public errors: ValidationError[]) {

        super("Validations Failed");

        Object.setPrototypeOf(this, ValidationErrorsError.prototype);

    }

    public get message() {
        return this.errors.map(error => error.message).join("\n")
    }

    public toString() {
        return this.message
    }


}
