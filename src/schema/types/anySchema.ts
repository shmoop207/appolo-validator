import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {Objects} from "appolo-utils/index";
import {SchemaDefaults} from "../../defaults/defaults";
import {IConstraintSchema} from "../../interfaces/IConstraintSchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ValidationParams} from "../../constraints/IConstraint";
import {IConverterSchema} from "../../interfaces/IConverterSchema";
import {OrConstraint} from "../../constraints/any/orConstraint";
import {IConverter, IConverterClass} from "../../converters/IConverter";
import {registerDecorator} from "../../decorators/registerDecorator";
import {NumberSchema} from "./numberSchema";

export class AnySchema {

    private _options: ISchemaOptions;
    private readonly _constraints: IConstraintSchema[] = [];
    private readonly _converters: IConverterSchema[] = [];

    protected _type: string;
    protected _params: {};

    constructor(options: IConstraintOptions = {}) {
        this._options = Objects.defaults({}, options, SchemaDefaults);
        this._type = "any";
        this._params = {}
    }

    public get converter(): IConverterClass {
        return null
    }

    public get params() {
        return this._params;
    }

    public get constraints(): IConstraintSchema[] {
        return this._constraints;
    }

    public get converters(): IConverterSchema[] {
        return this._converters;
    }

    public options(options: ISchemaOptions): this {
        this._options = Object.assign({}, this._options, options);

        return this;
    }

    public getOptions() {
        return this._options;
    }

    addConstraint(schema: IConstraintSchema): AnySchema {
        this._constraints.push(schema);
        return this
    }

    public addConverter(schema: IConverterSchema, top: boolean = false): AnySchema {
        top ? this._converters.unshift(schema) : this._converters.push(schema);
        return this
    }

}

export function any(options?: IConstraintOptions) {

    let schema = new AnySchema(options);

    return registerDecorator.extend<NumberSchema>({schema})

}

