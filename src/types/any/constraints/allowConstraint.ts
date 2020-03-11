import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {AnySchema} from "../anySchema";


export class AllowConstraint implements IConstraint {

    public validate(params: ValidationParams): IConstraintValidateResult {

        let allowed: any[] = params.args[0], value = params.value;

        if (!allowed || !allowed.length) {
            return {isValid: true}
        }

        for (let i = 0; i < allowed.length; i++) {
            let allowedItem = allowed[i];

            if (allowedItem === value || (Number.isNaN(allowedItem) && Number.isNaN(value))) {
                return {isValid: true};
            }
        }

        return {isValid: false};
    }

    public get type(): string {
        return "allow"
    }

    public get defaultMessage(): string {
        return ""
    }
}

registerConstraint.extend({
    base: AnySchema,
    name: "allow",
    constraint: AllowConstraint,
    whiteList: true
});

declare module '../anySchema' {

    interface AnySchema {
        allow(values: any[], options?: IConstraintOptions): this;
    }
}
