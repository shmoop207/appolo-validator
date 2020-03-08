import {Strings} from "appolo-utils";

export class ValidationError extends Error {


    private _object: Object;
    private _property: string | number;
    private _value: any;
    private _type: string;
    private _args: any[];
    private _message: string;
    private readonly _parents: { object: any, property: string | number }[];

    constructor(message?: string) {

        super();

        this._parents = [];

        Object.setPrototypeOf(this, ValidationError.prototype);

        if (message) {
            this.message = message;
        }
    }

    public get object(): Object {
        return this._object;
    }

    public get args(): any[] {
        return this._args;
    }

    public set args(value: any[]) {
        this._args = value;
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
        return this._createMessage();
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

    private _createMessage(): string {

        if (!this._message) {
            return "";
        }

        let dto = {
            value: this._value,
            object: this._object,
            property: this._property
        };

        if (this._args && this._args.length) {
            for (let i = 0; i < this._args.length; i++) {
                dto[`arg${i}`] = this._args[i];
            }
        }

        let output = "";
        for (let i = 0; i < this._parents.length; i++) {
            let prop = this._parents[i];

            output = this._addPrefix(prop.property, output);
        }

        dto.property =   this._addPrefix(dto.property != undefined ?dto.property : "value", output, false);

        let message = Strings.replaceFormat(this._message, dto);

        return message;
    }

    private _addPrefix(property: string | number, output: string, addDot = true): string {
        if (typeof property == "number") {
            output = output.slice(0, -1);
            output += `[${property}]`

        } else {
            output += `${property}`
        }

        if (addDot) {
            output += `.`
        }

        return output;
    }


    public toString() {
        return this.message;
    }

}
