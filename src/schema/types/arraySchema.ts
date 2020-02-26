import {AnySchema} from "./anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {Util} from "appolo-utils";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {ArrayConstraint} from "../../constraints/arrays/arrayConstraint";

export class ArraySchema extends AnySchema {

    constructor(options: IConstraintOptions={}) {
        super(options);

        this._type = "array";

        this.addConstraint({
            constraint: ArrayConstraint,
            options: options,
            args: []
        })
    }

    public get converter() {
        return require("../../converters/objects/jsonConverter").JsonConverter
    }
}

export function array(options?: IConstraintOptions) {
    return new ArraySchema(options)
}
