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
import {Ref} from "../../schema/ref";

export class FunctionSchema extends ObjectSchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "function";

    }
}

export function func(options?: IConstraintOptions) {

    let schema = registerSchema.extend<FunctionSchema>({type: FunctionSchema, options});

    return schema.isFunction(options);


}

export interface FunctionSchema {
    argsSize(limit: number | Ref, options?: IConstraintOptions): this;
    minArgs(limit: number | Ref, options?: IConstraintOptions): this;
    maxArgs(limit: number | Ref, options?: IConstraintOptions): this;
    isClass( options?: IConstraintOptions): this;
    isFunction( options?: IConstraintOptions): this;

}

