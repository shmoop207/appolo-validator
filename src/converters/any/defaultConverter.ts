import {IConverter} from "../IConverter";
import {ValidationParams} from "../../constraints/IConstraint";
import {NumberSchema} from "../../schema/types/numberSchema";
import {registerConverter} from "../../schema/registerConverter";
import {IConverterOptions} from "../../interfaces/IConverterOptions";
import {ObjectSchema} from "../../schema/types/objectSchema";
import {Util} from "appolo-utils/index";
import {AnySchema} from "../../schema/types/anySchema";

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

declare module '../../schema/types/anySchema' {

    interface AnySchema {
        default(value: any, options?: IConverterOptions): this;
    }
}
