import {StringSchema} from "../stringSchema";
import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";


export class SanitizeHtmlConvertor implements IConverter {
    public convert(params: ValidationParams): string {
        let value: string = params.value;
        const htmlTagPattern = /<([^>]+)>/gm;
        const replaceMap = {
            '<': '&lt;',
            '>': '&gt;'
        };
        let isHtml = htmlTagPattern.test(value);
        if (isHtml) {
            value = value.replace(/[<>]/g, (m) => {
                return replaceMap[m];
            });
        }

        return value;
    }

}

registerConverter.extend({
    base: StringSchema,
    name: "sanitizeHTML",
    converter: SanitizeHtmlConvertor
});

