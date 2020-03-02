import {Objects, Promises} from "appolo-utils/index";
import {AnySchema} from "../../schema/types/anySchema";
import {ValidationError} from "../../common/errors/ValidationError";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../IConstraint";
import {registerConstraint} from "../registerConstraint";
import {ObjectSchema} from "../../schema/types/objectSchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {Arrays} from "appolo-utils";


export class WithoutConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

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

    public defaultMessage(args: ValidationParams): string {
        return `Property that should have been absent at the same time as another one was present`
    }
}

registerConstraint.extend({
    base: ObjectSchema,
    name: "without",
    constraint: WithoutConstraint
});

declare module '../../schema/types/objectSchema' {


    interface ObjectSchema {
        without(key: string, peers: string | string[], options?: IConstraintOptions): this;
    }
}

