import {IConstraintClass} from "../interfaces/IConstraint";
import {Arrays, Objects} from "appolo-utils"
import {IConstraintSchema} from "../interfaces/IConstraintSchema";
import {AnySchema} from "../types/any/anySchema";
import {IConverterSchema} from "../interfaces/IConverterSchema";
import {IContextClass, IContextSchema} from "../interfaces/IContext";

interface IExtendParams {
    name: string,
    context: IContextClass,
    base: typeof AnySchema
}


export class RegisterContext {

    private _contexts = new Map<typeof AnySchema, IExtendParams[]>();

    public extend(params: IExtendParams) {

        if (!this._contexts.has(params.base)) {
            this._contexts.set(params.base, []);
        }

        this._contexts.get(params.base).push(params);


        params.base.prototype[params.name] = function (this: AnySchema) {

            let args = Array.from(arguments);

            let config: IContextSchema = {
                args: args,
                context: params.context,
            };

            this.addContext(config);

            return this;
        };
    }

    public get contexts() {
        return this._contexts;
    }
}

export const registerContext = new RegisterContext();
