import {IConstraintClass} from "../interfaces/IConstraint";
import {Arrays, Objects} from "@appolo/utils"
import {IConstraintSchema} from "../interfaces/IConstraintSchema";
import {AnySchema} from "../types/any/anySchema";
import {IConverterSchema} from "../interfaces/IConverterSchema";
import {IConverterClass} from "../interfaces/IConverter";

interface IExtendParams {
    name: string,
    converter: IConverterClass,
    base: typeof AnySchema
}


export class RegisterConverter {

    private _converters = new Map<typeof AnySchema, IExtendParams[]>();

    public extend(params: IExtendParams) {

        if(!this._converters.has(params.base)){
            this._converters.set(params.base,[]);
        }

        this._converters.get(params.base).push(params);


        params.base.prototype[params.name] = function (this: AnySchema) {

            let args = Array.from(arguments), options = args[args.length - 1];

            let config: IConverterSchema = {
                args: args,
                converter: params.converter,
                options: Objects.isPlain(options) ? options : {},
            };

            this.addConverter(config);

            return this;
        };
    }

    public get converters() {
        return this._converters;
    }

}

export const registerConverter = new RegisterConverter();
