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
import {Objects, Arrays} from "@appolo/utils";
import {IContextSchema} from "../../interfaces/IContext";
import {IConverterOptions} from "../../interfaces/IConverterOptions";
import {When} from "../../when/when";

export interface SchemaWrapper {
    getContext(name: string): any

    context(): { [index: string]: any }

    converters(): IConverterSchema[]

    constraints(): IConstraintSchema[]

    converters(): IConverterSchema[]

    getOptions(): ISchemaOptions

    getOptions(): ISchemaOptions

    getConstraintOptions(): IConstraintOptions
}

export class AnySchema {

    private _options: ISchemaOptions;
    private readonly _constraints: IConstraintSchema[] = [];
    private readonly _converters: IConverterSchema[] = [];
    private readonly _contexts: IContextSchema[] = [];

    protected _type: string;
    protected _context: { [index: string]: any };
    protected _constraintOptions: IConstraintOptions;

    constructor(constraintOptions: IConstraintOptions = {}) {
        this._options = Objects.defaults({}, SchemaDefaults);
        this._type = "any";
        this._context = {};
        this._constraintOptions = constraintOptions || {};
    }

    protected get context() {
        return this._context;
    }

    protected get constraints(): IConstraintSchema[] {
        return this._constraints;
    }

    protected get converters(): IConverterSchema[] {
        return this._converters;
    }

    protected get contexts(): IContextSchema[] {
        return this._contexts;
    }

    public groups(group: string | string[]): this {
        group = Arrays.arrayify(group);
        this._constraintOptions.groups = group;
        this._constraints.forEach(constraint => constraint.options.groups = group as string[]);

        return this;
    }

    public runIf(fn: (params: ValidationParams) => boolean): this {
        this._constraintOptions.runIf = fn;

        this._constraints.forEach(constraint => constraint.options.runIf = fn);

        return this;
    }

    public options(options: ISchemaOptions): this {
        this._options = Object.assign({}, this._options, options);

        return this;
    }

    protected getContext(name: string): any {
        return this._contexts[name];

    }

    public setContext(name: string, value: any): this {
        this._contexts[name] = value;

        return this;
    }

    protected getOptions() {
        return this._options;
    }

    protected getConstraintOptions() {
        return this._constraintOptions;
    }

    protected addConstraint(schema: IConstraintSchema): AnySchema {
        schema.options = Object.assign({}, this._constraintOptions, schema.options);
        this._constraints.push(schema);
        return this
    }

    protected addConverter(schema: IConverterSchema, top: boolean = false): AnySchema {
        top ? this._converters.unshift(schema) : this._converters.push(schema);
        return this
    }

    protected addContext(schema: IContextSchema, top: boolean = false): AnySchema {
        top ? this._contexts.unshift(schema) : this._contexts.push(schema);
        return this
    }

}

export function any(options?: IConstraintOptions) {

    return registerSchema.extend<AnySchema>({type: AnySchema, options});
}

export interface AnySchema {
    allow(values: any[], options?: IConstraintOptions): this;

    allowEmpty(options?: IConstraintOptions): this;

    and(schemas: AnySchema[] | AnySchema, options?: IConstraintOptions): this;

    forbidden(options?: IConstraintOptions): this;

    invalid(values: any[], options?: IConstraintOptions): this;

    optional(options?: IConstraintOptions): this;

    or(schemas: AnySchema[] | AnySchema, options?: IConstraintOptions): this;

    required(options?: IConstraintOptions): this;

    valid(values: any[], options?: IConstraintOptions): this;

    default(value: any, options?: IConverterOptions): this;

    await(options?: IConverterOptions): this;

    if(params: When): this;


}
