import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {registerSchema} from "../../schema/registerSchema";
import {Ref} from "../../schema/ref";
import {IConverterOptions} from "../../interfaces/IConverterOptions";

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

export interface BufferSchema {
    isBuffer(options?: IConstraintOptions): this;
    max(limit: number | Ref, options?: IConstraintOptions): this;
    min(limit: number | Ref, options?: IConstraintOptions): this;
    size(limit: number | Ref, options?: IConstraintOptions): this;
    toBuffer(encoding: "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex", options?: IConverterOptions): this;

}
