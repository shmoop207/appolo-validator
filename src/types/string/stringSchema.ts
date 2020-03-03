import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {registerSchema} from "../../schema/registerSchema";

export class StringSchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "string";
    }
}

export function string(options: IConstraintOptions & ISchemaOptions = {}) {
    let schema = registerSchema.extend<StringSchema>({type: StringSchema, options});

    schema.isString();

    return schema;
}
