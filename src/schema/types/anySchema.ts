import {ISchemaOptions} from "../../interfaces/IOptions";
import {Objects} from "appolo-utils/index";
import {SchemaDefaults} from "../../defaults/defaults";
import {IConstraintSchema} from "../../interfaces/IConstraintSchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ValidationParams} from "../../constraints/IConstraint";

export class AnySchema {

    private readonly _options: ISchemaOptions;
    private readonly _validators: IConstraintSchema[] = [];

    protected _type: string;

    constructor(validationOptions: IConstraintOptions = {}, schemaOptions: ISchemaOptions = {}) {
        this._options = Objects.defaults({}, schemaOptions, SchemaDefaults);
        this._type = "any";
    }

    public get validators(): IConstraintSchema[] {
        return this._validators;
    }

    public get options(): ISchemaOptions {
        return this._options;
    }

    public addValidation(schema: IConstraintSchema): AnySchema {
        this._validators.push(schema);
        return this
    }

    public async convert(value:any): Promise<any> {
        return value;
    }
}
