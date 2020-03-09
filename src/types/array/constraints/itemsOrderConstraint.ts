import {AnySchema} from "../../any/anySchema";
import {Arrays} from "appolo-utils";
import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {Ref} from "../../../schema/ref";
import {array, ArraySchema} from "../arraySchema";
import {Promises} from "appolo-utils/index";
import {ValidationError} from "../../../common/errors/ValidationError";
import {ItemsConstraint} from "./itemsConstraint";


export class ItemsOrderConstraint implements IConstraint {

    public async validate(params: ValidationParams): Promise<IConstraintValidateResult> {

        let schemas: AnySchema[] = params.args[0];

        if (params.value.length != schemas.length) {
            return {isValid: false}
        }

        let results = await Promises.map(schemas, (schema, i) => {
            return params.validator.validate(schema, params.value[i], {
                ...(params.validateOptions || {}),
                object: params.value,
                property: i
            });
        });

        let errors = ItemsConstraint.handleErrors(params, results);

        return {isValid: errors.length == 0, errors};

    }

    public get type(): string {
        return "itemsOrder"
    }

    public get defaultMessage(): string {
        return "${property} has invalid array values"
    }
}

registerConstraint.extend({
    base: ArraySchema,
    name: "order",
    constraint: ItemsOrderConstraint
});

declare module '../arraySchema' {


    interface ArraySchema {
        order(schemas: AnySchema[], options?: IConstraintOptions): this;
    }
}

