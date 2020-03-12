import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {registerSchema} from "../../schema/registerSchema";

export class BufferSchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "buffer";
    }
}

export function buffer(options: IConstraintOptions & ISchemaOptions = {}) {
    let schema = registerSchema.extend<BufferSchema>({type: BufferSchema, options});

    return schema.isBuffer(options);
}
