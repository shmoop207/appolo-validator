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

    public get converter() {
        return require("../../converters/numbers/numberConverter").NumberConverter
    }
}

export function number(options?: IConstraintOptions) {
    return new NumberSchema(options)
}
