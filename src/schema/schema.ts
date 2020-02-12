import {ISchemaOptions} from "../interfaces/IOptions";
import {Objects} from "appolo-utils/index";
import {SchemaDefaults} from "../defaults/defaults";
import {AnySchema} from "./types/anySchema";
import {IConstraintOptions} from "../interfaces/IConstraintOptions";
import {NumberSchema} from "./types/numberSchema";
import {ArraySchema} from "./types/arraySchema";
import {ObjectSchema} from "./types/objectSchema";


export class Schema {

    private readonly _options: ISchemaOptions;

    constructor(options: ISchemaOptions = {}) {
        this._options = Objects.defaults({}, options, SchemaDefaults);
    }

    public any(options?: IConstraintOptions) {
        return new AnySchema(options, this._options)
    }

    public number(options?: IConstraintOptions): NumberSchema {
        return new NumberSchema(options, this._options)
    }

    public array(schema?: AnySchema, options?: IConstraintOptions): ArraySchema {
        return new ArraySchema(schema,options, this._options)
    }

    public object(schemaIndex: { [index: string]: AnySchema }, options?: IConstraintOptions): ArraySchema {
        return new ObjectSchema(schemaIndex,options, this._options)
    }
}

