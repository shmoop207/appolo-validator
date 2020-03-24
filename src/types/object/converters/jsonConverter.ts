import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {NumberSchema} from "../../number/numberSchema";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {ObjectSchema} from "../objectSchema";
import {Util} from "appolo-utils";
import {ArraySchema} from "../../array/arraySchema";

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

registerConverter.extend({
    base: ArraySchema,
    name: "toJson",
    converter: JsonConverter
});

declare module '../objectSchema' {

    interface ObjectSchema {
    }
}

// declare module '../../../../index' {
//
//     interface ArraySchema {
//         toJson(options?: IConverterOptions): this;
//     }
// }
