export declare class ValidationError extends Error {
    private _object;
    private _property;
    private _value;
    private _type;
    private _args;
    private _message;
    private readonly _parents;
    constructor(message?: string);
    get object(): Object;
    get args(): any[];
    set args(value: any[]);
    set object(value: Object);
    get property(): string | number;
    set property(value: string | number);
    get value(): any;
    set value(value: any);
    get message(): string;
    set message(value: string);
    addParent(parent: {
        object: any;
        property: string | number;
    }): void;
    get parents(): {
        object: any;
        property: string | number;
    }[];
    get type(): string;
    set type(value: string);
    private _createMessage;
    private _addPrefix;
    toString(): string;
}
