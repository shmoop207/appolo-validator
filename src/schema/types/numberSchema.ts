import {AnySchema} from "./anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {NumberConstraint} from "../../constraints/numbers/numberConstraint";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";

export class NumberSchema extends AnySchema {

    constructor(options: IConstraintOptions={}) {
        super(options);

        this._type = "number";

        this.addConstraint({
            constraint: NumberConstraint,
            options: options,
            args: []
        });
    }

    beforeValidate(options: IValidateOptions) {

        if (options.convert) {

            this.addConverter({
                converter: require("../../converters/numbers/numberConverter").NumberConverter,
                args: []
            }, true)
        }

        return super.beforeValidate(options);
    }
}

export function number(options?: IConstraintOptions) {
    return new NumberSchema(options)
}
