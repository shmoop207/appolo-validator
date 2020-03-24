import {AnySchema} from "../any/anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {Util} from "appolo-utils";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {ArrayConstraint} from "./constraints/arrayConstraint";
import {registerSchema} from "../../schema/registerSchema";
import {IClass} from "appolo-engine/index";
import {When} from "../../when/when";
import {number} from "../number/numberSchema";
import {Ref} from "../../schema/ref";
import {IConverterOptions} from "../../interfaces/IConverterOptions";

export class ArraySchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "array";

    }
}


export function array(items?: { [index: string]: AnySchema | Pick<When, any> } | AnySchema | AnySchema[] | IClass | IClass[], options?: IConstraintOptions) {
    let schema = registerSchema.extend<ArraySchema>({type: ArraySchema, options});

    if (items) {
        schema.items(items)
    }

    return schema.isArray(options)
        .toJson({runIf: (params) => params.validateOptions.convert})

}

export interface ArraySchema {
    isArray(options?: IConstraintOptions): this;

    max(limit: number | Ref, options?: IConstraintOptions): this;

    items(schema?: { [index: string]: AnySchema | Pick<When, any> } | AnySchema | AnySchema[] | IClass | IClass[], options?: IConstraintOptions): this;

    toJson(options?: IConverterOptions): this;

    toUniq(fn?: ((item: any, index?: number) => any), options?: IConverterOptions): this;

    toSort(fn?: ((item: any) => any), options?: IConverterOptions): this;

    uniq(fn?: ((item: any, index?: number) => any), options?: IConstraintOptions): this;

    size(limit: number | Ref, options?: IConstraintOptions): this;

    min(limit: number | Ref, options?: IConstraintOptions): this;

    order(schemas: AnySchema[], options?: IConstraintOptions): this;

    has(item: AnySchema, options?: IConstraintOptions): this;

    contains(item: any | Ref, options?: IConstraintOptions): this;


}
