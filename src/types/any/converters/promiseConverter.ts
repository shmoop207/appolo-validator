import {IConverter} from "../../../interfaces/IConverter";
import {ValidationParams} from "../../../interfaces/IConstraint";
import {Promises} from "appolo-utils";
import {registerConverter} from "../../../schema/registerConverter";
import {IConverterOptions} from "../../../interfaces/IConverterOptions";
import {ObjectSchema} from "../../object/objectSchema";
import {AnySchema} from "../anySchema";

export class PromiseConverter implements IConverter {

    public async convert(params: ValidationParams): Promise<any> {
        let value = params.value;
        if (!Promises.isPromise(value)) {
            return value;
        }
        try {
            let dto = await value;
            return dto;
        } catch (e) {
            return value;
        }
    }
}

registerConverter.extend({
    base: AnySchema,
    name: "await",
    converter: PromiseConverter
});

declare module '../anySchema' {

    interface AnySchema {
        await(options?: IConverterOptions): this;
    }
}
