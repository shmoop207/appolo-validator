import {IConstraint} from "../../constraints/IConstraint";

export class ValidationError extends Error {


    private _target: Object;
    private _property: string | number;
    private _value: any;
    private _type: string;
    private _message: string;
    private readonly _constraints: ValidationError[];

    constructor() {

        super();

        this._constraints = [];

        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    public get target(): Object {
        return this._target;
    }

    public set target(value: Object) {
        this._target = value;
    }

    public get property(): string | number {
        return this._property;
    }

    public set property(value: string | number) {
        this._property = value;
    }

    public get value(): any {
        return this._value;
    }

    public set value(value: any) {
        this._value = value;
    }

    public get message(): string {
        return this._message;
    }

    public set message(value: string) {
        this._message = value;
    }

    public get constraints(): ValidationError[] {
        return this._constraints;
    }


    public get type(): string {
        return this._type;
    }

    public set type(value: string) {
        this._type = value;
    }

}
