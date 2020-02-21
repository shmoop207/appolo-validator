import {AnySchema} from "./anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {Util} from "appolo-utils";
import {ISchemaOptions} from "../../interfaces/IOptions";
import {ArrayConstraint} from "../../constraints/arrays/arrayConstraint";

export class ArraySchema extends AnySchema {

    constructor(schema?: AnySchema, validationOptions: IConstraintOptions = {}, schemaOptions: ISchemaOptions = {}) {
        super(validationOptions, schemaOptions);

        this._type = "array";

        this.addConstraint({
            constraint: ArrayConstraint,
            options: validationOptions,
            args: schema ? [schema] : []
        })
    }

    public async convert(value: any): Promise<any> {
        return typeof value === 'string' ? Util.objects.tryParseJSON(value) || value : value
    }
}
