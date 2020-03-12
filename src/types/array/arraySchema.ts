import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {Util} from "appolo-utils";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {ArrayConstraint} from "./constraints/arrayConstraint";
import {registerSchema, Schema} from "../../schema/registerSchema";
import {IClass} from "appolo-engine/index";

export class ArraySchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "array";

    }
}

export function array(items?: Schema | Schema[] | IClass | IClass[], options?: IConstraintOptions) {
    let schema = registerSchema.extend<ArraySchema>({type: ArraySchema, options});

    schema.toJson({runIf: (params) => params.validateOptions.convert});

    if (items) {
        schema.items(items)
    }

    return schema.isArray(options)

}
