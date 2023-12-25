import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {registerSchema} from "../../schema/registerSchema";
import {IConverterOptions} from "../../interfaces/IConverterOptions";
import {Ref} from "../../schema/ref";

export class StringSchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "string";
    }
}

export function string(options: IConstraintOptions & ISchemaOptions = {}) {
    let schema = registerSchema.extend<StringSchema>({type: StringSchema, options});

    return schema.isString(options);
}

export interface StringSchema {
    decode(options?: IConverterOptions): this;
    emptyToNull(options?: IConverterOptions): this;
    truncate(limit: number, options?: IConverterOptions): this;
    trim(options?: IConverterOptions): this;
    slugify(options?: IConverterOptions): this;
    sanitize(options?: IConverterOptions): this;
    replace(searchValue: string | RegExp, replaceValue: string, options?: IConverterOptions): this;
    uuid(options?: IConstraintOptions): this;
    url(options?: IConstraintOptions): this;
    uppercase(options?: IConstraintOptions): this;
    token(options?: IConstraintOptions): this;
    isString(options?: IConstraintOptions): this;
    slug(options?: IConstraintOptions): this;
    size(limit: number | Ref, options?: IConstraintOptions): this;
    regex(regex: RegExp, options?: IConstraintOptions): this;
    numeric(options?: IConstraintOptions): this;
    mongoId(options?: IConstraintOptions): this;
    min(limit: number, options?: IConstraintOptions): this;
    md5(options?: IConstraintOptions): this;
    max(limit: number, options?: IConstraintOptions): this;
    lowercase(options?: IConstraintOptions): this;
    jwt(options?: IConstraintOptions): this;
    json(options?: IConstraintOptions): this;
    isoDate(options?: IConstraintOptions): this;
    ip(options?: IConstraintOptions): this;
    hexadecimal(options?: IConstraintOptions): this;
    hash(type: "md5" | "md4" | "sha1" | "sha256" | "sha384" | "sha512", options?: IConstraintOptions): this;
    enum(enumType: any, options?: IConstraintOptions): this;
    email(options?: IConstraintOptions): this;
    domain(options?: IConstraintOptions): this;
    contains(value: string, options?: IConstraintOptions): this;
    base64(options?: IConstraintOptions): this;
    ascii(options?: IConstraintOptions): this;
    alpha(options?: IConstraintOptions): this;
    alphanum(options?: IConstraintOptions): this;
    mongoSanitize(params?: {}, options?: IConstraintOptions): this;
    sanitizeHTML(options?: IConverterOptions): this;
}
