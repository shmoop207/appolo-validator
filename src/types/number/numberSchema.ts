import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {NumberConstraint} from "./constraints/numberConstraint";

import {registerDecorator} from "../../decorators/registerDecorator";
import {registerSchema} from "../../schema/registerSchema";
import {FunctionSchema} from "../function/functionSchema";

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
