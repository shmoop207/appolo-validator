import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {NumberConstraint} from "./constraints/numberConstraint";

import {registerDecorator} from "../../decorators/registerDecorator";
import {registerSchema} from "../../schema/registerSchema";
import {FunctionSchema} from "../function/functionSchema";
import {Ref} from "../../schema/ref";
import {IConverterOptions} from "../../interfaces/IConverterOptions";

export class NumberSchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "number";
    }
}

export function number(options?: IConstraintOptions) {

    let schema = registerSchema.extend<NumberSchema>({type: NumberSchema, options});

    return schema.float(options)
        .toFloat({runIf: (params) => params.validateOptions.convert});


}

export interface NumberSchema {
    integer(options?: IConstraintOptions): this;
    max(max: number | Ref, options?: IConstraintOptions): this;
    min(min: number | Ref, options?: IConstraintOptions): this;
    multiple(base: number, options?: IConstraintOptions): this;
    negative(options?: IConstraintOptions): this;
    float(options?: IConstraintOptions): this;
    port(options?: IConstraintOptions): this;
    positive(options?: IConstraintOptions): this;
    toInteger(options?: IConverterOptions): this;
    toFloat(options?: IConverterOptions): this;
    toPrecision(precision: number, options?: IConverterOptions): this;

}
