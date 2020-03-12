import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {Util} from "appolo-utils";

import {registerSchema} from "../../schema/registerSchema";
import {IClass} from "appolo-engine/index";
import {When} from "../../when/when";

export class ObjectSchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "object";

    }

}

export function object(keys?: IClass | { [index: string]: AnySchema | Pick<When, any> }, options?: IConstraintOptions) {

    let schema = registerSchema.extend<ObjectSchema>({type: ObjectSchema, options});

    if (keys) {
        schema.keys(keys);
    }

    return schema.isObjectOrClass({}).toJson({runIf: (params) => params.validateOptions.convert})
}
