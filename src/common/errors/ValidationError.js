"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor() {
        super();
        this._parents = [];
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    get object() {
        return this._object;
    }
    set object(value) {
        this._object = value;
    }
    get property() {
        return this._property;
    }
    set property(value) {
        this._property = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
    addParent(parent) {
        this._parents.unshift(parent);
    }
    get parents() {
        return this._parents;
    }
    // public get constraints(): ValidationError[] {
    //     return this._constraints;
    // }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map