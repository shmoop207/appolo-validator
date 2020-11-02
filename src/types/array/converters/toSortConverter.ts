import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {Arrays} from "@appolo/utils";
import {ArraySchema} from "../arraySchema";

export class ToSortConverter implements IConverter {

    public convert(params: ValidationParams): Promise<any> | any {

        if (!Array.isArray(params.value)) {
            return params.value;
        }
        let fn = params.args[0] || ((item) => item);

        let uniq = Arrays.sortBy(params.value, fn);

        return uniq;
    }
}

registerConverter.extend({
    base: ArraySchema,
    name: "toSort",
    converter: ToSortConverter
});

// declare module '../../../../index' {
//
//     interface ArraySchema {
//         toSort(fn?: ((item: any) => any), options?: IConverterOptions): this;
//     }
// }
