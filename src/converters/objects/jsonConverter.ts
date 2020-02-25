import {IConverter} from "../IConverter";
import {ValidationParams} from "../../constraints/IConstraint";
import {NumberSchema} from "../../schema/types/numberSchema";
import {registerConverter} from "../../schema/registerConverter";
import {IConverterOptions} from "../../interfaces/IConverterOptions";
import {ObjectSchema} from "../../schema/types/objectSchema";
import {Util} from "appolo-utils/index";

export class JsonConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {
        let value = params.value;
        return typeof value === 'string' ? Util.objects.tryParseJSON(value) || value : value
    }
}

registerConverter.extend({
    base: ObjectSchema,
    name: "toJson",
    converter: JsonConverter
});

declare module '../../schema/types/objectSchema' {

    interface ObjectSchema {
        toJson(options?: IConverterOptions): this;
    }
}
