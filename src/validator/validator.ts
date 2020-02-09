import {define, singleton, inject, injectFactoryMethod} from "appolo-engine"
import {IOptions, ISchemaOptions} from "../interfaces/IOptions";
import {Schema} from "../register/schema";
import {Objects} from "appolo-utils/index";
import {SchemaDefaults, ValidatorDefaults} from "../defaults/defaults";

@define()
export class Validator {
    @inject() private options: IOptions;
    @injectFactoryMethod(Schema) private createSchema: (options: ISchemaOptions) => Schema;

    public schema(options: ISchemaOptions = {}) {

        options = Objects.defaults({}, options, this.options, SchemaDefaults, ValidatorDefaults);

        return this.createSchema(options);
    }
}


