import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {ArraySchema} from "../../array/arraySchema";
import {StringSchema} from "../stringSchema";

export class ReplaceConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {
        let value: string = params.value, searchValue: string = params.args[0], replaceValue: string = params.args[1];
        return typeof value === 'string' ? value.replace(searchValue, replaceValue) : value
    }
}

registerConverter.extend({
    base: StringSchema,
    name: "replace",
    converter: ReplaceConverter
});



