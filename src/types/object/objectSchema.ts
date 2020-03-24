import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {Util} from "appolo-utils";

import {registerSchema} from "../../schema/registerSchema";
import {IClass} from "appolo-engine/index";
import {When} from "../../when/when";
import {IConverterOptions} from "../../interfaces/IConverterOptions";
import {Ref} from "../../schema/ref";

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


export interface ObjectSchema {
    toJson(options?: IConverterOptions): this;
    without(key: string, peers: string | string[], options?: IConstraintOptions): this;
    with(key: string, peers: string | string[], options?: IConstraintOptions): this;
    size(limit: number | Ref, options?: IConstraintOptions): this;
    minKeys(limit: number | Ref, options?: IConstraintOptions): this;
    maxKeys(limit: number | Ref, options?: IConstraintOptions): this;
    isPlain( options?: IConstraintOptions): this;
    keys(schemaIndex: IClass | { [index: string]: AnySchema | Pick<When, any> }, options?: IConstraintOptions): this;
    isObjectOrClass(options?: IConstraintOptions): this;
    isObject(options?: IConstraintOptions): this;
    instanceOf(value:any, options?: IConstraintOptions): this;

}
