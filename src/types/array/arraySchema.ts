import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {Util} from "appolo-utils";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {ArrayConstraint} from "./constraints/arrayConstraint";
import {registerSchema} from "../../schema/registerSchema";

export class ArraySchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "array";

    }
}

export function array(options?: IConstraintOptions) {
    let schema = registerSchema.extend<ArraySchema>({type: ArraySchema, options});

    schema.isArray().toJson({runIf: (params) => params.validateOptions.convert});

    return schema

}
