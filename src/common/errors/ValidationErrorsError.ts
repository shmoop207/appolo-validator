import {Strings} from "appolo-utils";
import {ValidationError} from "./ValidationError";

export class ValidationErrorsError extends Error {

    constructor(public errors: ValidationError[]) {

        super("validations failed");

        Object.setPrototypeOf(this, ValidationErrorsError.prototype);

    }

    public toString() {
        return this.errors.map(error => error.message).join("\n")
    }


}
