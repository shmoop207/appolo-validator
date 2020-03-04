import {ISchemaOptions, IValidateOptions} from "../../interfaces/IOptions";
import {SchemaDefaults} from "../../defaults/defaults";
import {IConstraintSchema} from "../../interfaces/IConstraintSchema";
import {IConstraintOptions} from "../../interfaces/IConstraintOptions";
import {ValidationParams} from "../../interfaces/IConstraint";
import {IConverterSchema} from "../../interfaces/IConverterSchema";
import {OrConstraint} from "./constraints/orConstraint";
import {IConverter, IConverterClass} from "../../interfaces/IConverter";
import {registerDecorator} from "../../decorators/registerDecorator";
import {NumberSchema} from "../number/numberSchema";
import {registerSchema} from "../../schema/registerSchema";
import {Objects} from "appolo-utils";
import {IContextSchema} from "../../interfaces/IContext";

export class AnySchema {

    private _options: ISchemaOptions;
    private readonly _constraints: IConstraintSchema[] = [];
    private readonly _converters: IConverterSchema[] = [];
    private readonly _contexts: IContextSchema[] = [];

    public hasRef: boolean;

    protected _type: string;
    protected _context: { [index: string]: any };

    constructor(options: IConstraintOptions = {}) {
        this._options = Objects.defaults({}, SchemaDefaults);
        this._type = "any";
        this._context = {}
    }

    public get context() {
        return this._context;
    }

    public get constraints(): IConstraintSchema[] {
        return this._constraints;
    }

    public get converters(): IConverterSchema[] {
        return this._converters;
    }

    public get contexts(): IContextSchema[] {
        return this._contexts;
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

    public addContext(schema: IContextSchema, top: boolean = false): AnySchema {
        top ? this._contexts.unshift(schema) : this._contexts.push(schema);
        return this
    }

}

export function any(options?: IConstraintOptions) {

    return registerSchema.extend<AnySchema>({type: AnySchema, options});
}

