import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";

import {registerSchema} from "../../schema/registerSchema";

export class ObjectSchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "object";

    }

}

export function object(options?: IConstraintOptions) {

    let schema = registerSchema.extend<ObjectSchema>({type: ObjectSchema, options});

    schema.isObject().toJson({runIf: (params) => params.validateOptions.convert});

    return schema
}
