import {IConstraintClass} from "../constraints/IConstraint";
import {Arrays, Objects} from "appolo-utils"
import {IConstraintSchema} from "../interfaces/IConstraintSchema";
import {AnySchema} from "./types/anySchema";


export class RegisterConstraint {

    public extend(params: { name: string, constraint: IConstraintClass, base: typeof AnySchema }) {
        params.base.prototype[params.name] = function (this: AnySchema) {

            let args = Array.from(arguments), options = args[args.length - 1];

            this.addValidation({
                args: args,
                constraint: params.constraint,
                options: Objects.isPlain(options) ? options : {}
            });

            return this;
        };
    }

}

export const registerConstraint = new RegisterConstraint();
