import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {ArrayConstraint} from "../array/constraints/arrayConstraint";
import {registerDecorator} from "../../decorators/registerDecorator";
import {NumberSchema} from "../number/numberSchema";
import {ObjectSchema} from "../object/objectSchema";
import {FuncConstraint} from "./constraints/funcConstraint";
import {registerSchema} from "../../schema/registerSchema";
import {ArraySchema} from "../array/arraySchema";

export class FunctionSchema extends ObjectSchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "function";

    }
}

export function func(options?: IConstraintOptions) {

    let schema = registerSchema.extend<FunctionSchema>({type: FunctionSchema, options});

    return schema.isFunction();


}
