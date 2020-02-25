import {IConstraintClass, IConverterClass} from "../constraints/IConstraint";
import {Arrays, Objects} from "appolo-utils"
import {IConstraintSchema} from "../interfaces/IConstraintSchema";
import {AnySchema} from "./types/anySchema";
import {IConverterSchema} from "../interfaces/IConverterSchema";


export class RegisterConverter {

    public extend(params: { name: string, converter: IConverterClass, base: typeof AnySchema }) {
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

}

export const registerConverter = new RegisterConverter();
