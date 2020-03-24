import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {NumberSchema} from "../../number/numberSchema";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {ObjectSchema} from "../../object/objectSchema";
import {AnySchema} from "../anySchema";

export class DefaultConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {
        let value = params.value, defaultValue = params.args[0];
        return typeof value === "undefined" ? defaultValue : value
    }
}

registerConverter.extend({
    base: AnySchema,
    name: "default",
    converter: DefaultConverter
});
