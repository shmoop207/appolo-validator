import {AnySchema} from "./anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {ArrayConstraint} from "../../constraints/arrays/arrayConstraint";
import {registerDecorator} from "../../decorators/registerDecorator";
import {NumberSchema} from "./numberSchema";
import {ObjectSchema} from "./objectSchema";
import {FuncConstraint} from "../../constraints/function/funcConstraint";

export class FunctionSchema extends ObjectSchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "function";

        this.addConstraint({
            constraint: FuncConstraint,
            options: options,
            args: []
        })

    }
}

export function func(options?: IConstraintOptions) {

    let schema = new FunctionSchema(options);

    return registerDecorator.extend<FunctionSchema>({schema})


}
