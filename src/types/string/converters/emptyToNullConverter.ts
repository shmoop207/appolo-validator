import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {Strings} from "@appolo/utils";
import {ArraySchema} from "../../array/arraySchema";
import {StringSchema} from "../stringSchema";

export class EmptyToNullConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {
        let value: string = params.value;
        return value === "" ? null : value
    }
}

registerConverter.extend({
    base: StringSchema,
    name: "emptyToNull",
    converter: EmptyToNullConverter
});



