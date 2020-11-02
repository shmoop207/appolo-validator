import {AnySchema} from "../../any/anySchema";
import {Arrays} from "@appolo/utils";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";
import {ArraySchema} from "../arraySchema";


export class ContainsConstraint implements IConstraint {

    public  validate(params: ValidationParams): IConstraintValidateResult {

        let values = Arrays.arrayify(params.args[0]);


        for (let i = 0; i < params.value.length; i++) {

            let result;

            result = values.every(value => {
                if (typeof params.args[0] == "function") {
                    return params.args[0](params.value[i]);
                } else {
                    return params.value[i] === params.args[0]
                }
            });

            if (result) {
                return {isValid: true}
            }
        }

        return {isValid: false};

    }

    public get type(): string {
        return "Contains"
    }

    public get defaultMessage(): string {
        return "${property} has invalid values"
    }
}

registerConstraint.extend({
    base: ArraySchema,
    name: "contains",
    constraint: ContainsConstraint
});

// declare module '../../../../index' {
//
//
//     interface ArraySchema {
//         contains(item: any | Ref, options?: IConstraintOptions): this;
//     }
// }

