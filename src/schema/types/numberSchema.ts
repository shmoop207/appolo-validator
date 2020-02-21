import {AnySchema} from "./anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {NumberConstraint} from "../../constraints/numbers/numberConstraint";
import {ISchemaOptions} from "../../interfaces/IOptions";

export class NumberSchema extends AnySchema {

    constructor(validationOptions: IConstraintOptions = {}, schemaOptions: ISchemaOptions = {}) {
        super(validationOptions, schemaOptions);

        this._type = "number";

        this.addConstraint({
            constraint: NumberConstraint,
            options: validationOptions,
            args: []
        })
    }

    public async convert(value: any): Promise<any> {
        return typeof value === 'string' ? parseFloat(value) : value
    }
}
