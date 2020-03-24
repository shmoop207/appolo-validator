import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {registerSchema} from "../../schema/registerSchema";
import {Ref} from "../../schema/ref";
import {IConverterOptions} from "../../interfaces/IConverterOptions";

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

export interface DateSchema {
    isDate(options?: IConstraintOptions): this;
    max(date: Date | string | number, format?: string, options?: IConstraintOptions): this;
    min(date: Date | string | number | Ref,format?:string, options?: IConstraintOptions): this;
    format(format?: string, options?: IConverterOptions): this;
    toUtc(options?: IConverterOptions): this;

}
