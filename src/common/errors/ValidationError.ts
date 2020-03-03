import {IConstraint} from "../../interfaces/IConstraint";

export class ValidationError extends Error {


    private _object: Object;
    private _property: string | number;
    private _value: any;
    private _type: string;
    private _message: string;
    private readonly _parents: { object: any, property: string | number }[];

    constructor() {

        super();

        this._parents = [];

        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    public get object(): Object {
        return this._object;
    }

    public set object(value: Object) {
        this._object = value;
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

    public addParent(parent: { object: any, property: string | number }) {
        this._parents.unshift(parent);
    }

    public get parents(): { object: any, property: string | number }[] {
        return this._parents;
    }

    // public get constraints(): ValidationError[] {
    //     return this._constraints;
    // }


    public get type(): string {
        return this._type;
    }

    public set type(value: string) {
        this._type = value;
    }

}
