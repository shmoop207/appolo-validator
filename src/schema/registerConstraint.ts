import {IConstraintClass} from "../constraints/IConstraint";
import {Arrays, Objects} from "appolo-utils"
import {IConstraintSchema} from "../interfaces/IConstraintSchema";
import {AnySchema} from "./types/anySchema";


export class RegisterConstraint {

    public extend(params: { name: string, constraint: IConstraintClass, base: typeof AnySchema, whiteList?: boolean, blackList?: boolean }) {
        params.base.prototype[params.name] = function (this: AnySchema) {

            let args = Array.from(arguments), options = args[args.length - 1];

            let config: IConstraintSchema = {
                args: args,
                constraint: params.constraint,
                options: Objects.isPlain(options) ? options : {},
                whiteList: params.whiteList,
                blackList: params.blackList
            };

            this.addConstraint(config);

            return this;
        };
    }

}

export const registerConstraint = new RegisterConstraint();
