import {AnySchema} from "./anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ISchemaOptions} from "../../interfaces/IOptions";
import {ArrayConstraint} from "../../constraints/arrays/arrayConstraint";
import {ObjectConstraint} from "../../constraints/objects/objectConstraint";
import {Util} from "appolo-utils/index";

export class ObjectSchema extends AnySchema {

    constructor(schemaIndex: { [index: string]: AnySchema }, validationOptions: IConstraintOptions = {}, schemaOptions: ISchemaOptions = {}) {
        super(validationOptions, schemaOptions);

        this._type = "object";

        this.addConstraint({
            constraint: ObjectConstraint,
            options: validationOptions,
            args: schemaIndex ? [schemaIndex] : []
        })
    }

    public async convert(value: any): Promise<any> {
        return typeof value === 'string' ? Util.objects.tryParseJSON(value) || value : value
    }
}
