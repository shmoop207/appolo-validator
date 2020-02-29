import {AnySchema} from "./anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {ArrayConstraint} from "../../constraints/arrays/arrayConstraint";
import {ObjectConstraint} from "../../constraints/objects/objectConstraint";
import {Util} from "appolo-utils/index";
import {registerDecorator} from "../../decorators/registerDecorator";
import {NumberSchema} from "./numberSchema";

export class ObjectSchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "object";

        this.addConstraint({
            constraint: ObjectConstraint,
            options: options,
            args: []
        })
    }

    public get converter() {
        return require("../../converters/objects/jsonConverter").JsonConverter
    }
}

export function object(options?: IConstraintOptions) {

    let schema = new ObjectSchema(options);

    return registerDecorator.extend<ObjectSchema>({schema})


}
