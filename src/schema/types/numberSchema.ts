import {AnySchema} from "./anySchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {NumberConstraint} from "../../constraints/numbers/numberConstraint";

import {registerDecorator} from "../../decorators/registerDecorator";

export class NumberSchema extends AnySchema {

    constructor(options: IConstraintOptions = {}) {
        super(options);

        this._type = "number";

        this.addConstraint({
            constraint: NumberConstraint,
            options: options,
            args: []
        });
    }

    public get converter() {
        return require("../../converters/numbers/numberConverter").NumberConverter
    }
}


export function number(options?: IConstraintOptions) {

    let schema = new NumberSchema(options);

    return registerDecorator.extend<NumberSchema>({schema})
}
