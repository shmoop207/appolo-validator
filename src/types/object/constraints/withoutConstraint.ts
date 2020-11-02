import {AnySchema} from "../../any/anySchema";
import {ValidationError} from "../../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {ObjectSchema} from "../objectSchema";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Arrays} from "@appolo/utils";


export class WithoutConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let key = params.args[0];
        let peers = Arrays.arrayify(params.args[1]);

        if (params.value[key] === undefined) {
            return {isValid: true};
        }

        for (let i = 0; i < peers.length; i++) {
            if (params.value[peers[i] as any] !== undefined) {
                return {isValid: false}
            }
        }

        return {isValid: true};

    }

    public get type(): string {
        return "without"
    }

    public get defaultMessage(): string {
        return "${property} has invalid keys"
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "without",
    constraint: WithoutConstraint
});



