import {AnySchema} from "./anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {NumberConstraint} from "../../constraints/numbers/numberConstraint";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {StringConstraint} from "../../constraints/string/stringConstraint";

export class StringSchema extends AnySchema {

    constructor(options: IConstraintOptions={}) {
        super(options);

        this._type = "string";

        this.addConstraint({
            constraint: StringConstraint,
            options: options,
            args: []
        });
    }

}

export function string(options: IConstraintOptions & ISchemaOptions = {}) {
    return new StringSchema(options)
}
