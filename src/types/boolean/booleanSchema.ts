import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {registerSchema} from "../../schema/registerSchema";
import {IConverterOptions} from "../../interfaces/IConverterOptions";

export class BooleanSchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "boolean";
    }
}

export function boolean(options: IConstraintOptions & ISchemaOptions &  { truthy?: any[], falsy?: any[] } = {}) {
    let schema = registerSchema.extend<BooleanSchema>({type: BooleanSchema, options});

    return schema
        .isBoolean(options)
        .toBoolean(options,{runIf: (params) => params.validateOptions.convert});

}

export interface BooleanSchema {
    isBoolean(options?: IConstraintOptions): this;
    toBoolean(opts: { truthy?: any[], falsy?: any[] }, options?: IConverterOptions): this;

}
