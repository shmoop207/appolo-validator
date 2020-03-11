import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {StringSchema} from "../stringSchema";
import * as net from 'net';


export class IpStringConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {
        const value:string = params.value;

        return {isValid: typeof value == "string"&& net.isIP(value) != 0};
    }

    public get type(): string {
        return "ip"
    }

    public get defaultMessage(): string {
        return "${property} is not valid ip string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "ip",
    constraint: IpStringConstraint
});

declare module '../stringSchema' {

    interface StringSchema {
        ip(options?: IConstraintOptions): this;
    }
}
