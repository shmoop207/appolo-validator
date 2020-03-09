import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {Arrays} from "appolo-utils/index";
import {ArraySchema} from "../arraySchema";

export class ToUniqConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {

        if (!Array.isArray(params.value)) {
            return params.value;
        }
        let fn = params.args[0] || ((item) => item);

        let uniq = Arrays.uniqBy(params.value, fn);

        return uniq;
    }
}

registerConverter.extend({
    base: ArraySchema,
    name: "toUniq",
    converter: ToUniqConverter
});

declare module '../ArraySchema' {

    interface ArraySchema {
        toUniq(fn?: ((item: any, index?: number) => any), options?: IConverterOptions): this;
    }
}
