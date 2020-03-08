"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
class ValidationError extends Error {
    constructor(message) {
        super();
        this._parents = [];
        Object.setPrototypeOf(this, ValidationError.prototype);
        if (message) {
            this.message = message;
        }
    }
    get object() {
        return this._object;
    }
    get args() {
        return this._args;
    }
    set args(value) {
        this._args = value;
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
        return this._createMessage();
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
    _createMessage() {
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
        dto.property = this._addPrefix(dto.property != undefined ? dto.property : "value", output, false);
        let message = appolo_utils_1.Strings.replaceFormat(this._message, dto);
        return message;
    }
    _addPrefix(property, output, addDot = true) {
        if (typeof property == "number") {
            output = output.slice(0, -1);
            output += `[${property}]`;
        }
        else {
            output += `${property}`;
        }
        if (addDot) {
            output += `.`;
        }
        return output;
    }
    toString() {
        return this.message;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map