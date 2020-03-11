import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {Util} from "appolo-utils";
import {ArraySchema} from "../../array/arraySchema";
import {StringSchema} from "../stringSchema";

export class SlugifyConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {
        let value: string = params.value;

        if (typeof value !== 'string') {
            return value;
        }

        return value.toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '')
    }
}

registerConverter.extend({
    base: StringSchema,
    name: "slugify",
    converter: SlugifyConverter
});


declare module '../stringSchema' {

    interface StringSchema {
        slugify(options?: IConverterOptions): this;
    }
}

