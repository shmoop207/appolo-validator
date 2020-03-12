import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {registerSchema} from "../../schema/registerSchema";

export class DateSchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "date";
    }
}

export function date(options: IConstraintOptions & ISchemaOptions = {}) {
    let schema = registerSchema.extend<DateSchema>({type: DateSchema, options});

    return  schema.isDate(options);

}
