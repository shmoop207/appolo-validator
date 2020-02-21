import {ISchemaOptions} from "../../interfaces/IOptions";
import {Objects} from "appolo-utils/index";
import {SchemaDefaults} from "../../defaults/defaults";
import {IConstraintSchema} from "../../interfaces/IConstraintSchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ValidationParams} from "../../constraints/IConstraint";

export class AnySchema {

    private readonly _options: ISchemaOptions;
    private readonly _constraints: IConstraintSchema[] = [];

    protected _type: string;
    protected _params: {};

    constructor(validationOptions: IConstraintOptions = {}, schemaOptions: ISchemaOptions = {}) {
        this._options = Objects.defaults({}, schemaOptions, SchemaDefaults);
        this._type = "any";
        this._params = {}
    }


    public get params() {
        return this._params;
    }

    public get constraints(): IConstraintSchema[] {
        return this._constraints;
    }


    public get options(): ISchemaOptions {
        return this._options;
    }

    public addConstraint(schema: IConstraintSchema): AnySchema {
        this._constraints.push(schema);
        return this
    }


    public async convert(value: any): Promise<any> {
        return value;
    }
}
