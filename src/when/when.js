"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ref_1 = require("../schema/ref");
const index_1 = require("appolo-utils/index");
const registerDecorator_1 = require("../decorators/registerDecorator");
class When {
    constructor(prop) {
        this._params = { cases: [] };
        this._params.prop = typeof prop === "string" ? new ref_1.Ref(prop) : prop;
    }
    property(prop) {
        this._params.prop = new ref_1.Ref(prop);
        return this;
    }
    ref(ref) {
        this._params.prop = new ref_1.Ref(ref);
        return this;
    }
    refFn(fn) {
        this._params.prop = fn;
        return this;
    }
    get is() {
        return this;
    }
    get params() {
        return this._params;
    }
    _getCase() {
        if (!this._case) {
            this._case = {};
            this._params.cases.push(this._case);
        }
        return this._case;
    }
    value(value) {
        this._getCase().value = value;
        return this;
    }
    fn(value) {
        this._getCase().fn = value;
        return this;
    }
    group(group) {
        if (typeof group == "string") {
            group = [group];
        }
        this._getCase().groups = group;
        return this;
    }
    schema(schema) {
        this._getCase().schema = schema;
        return this;
    }
    then(schema) {
        this._getCase().thenSchema = schema;
        return this;
    }
    case(when) {
        if (when.params.cases.length) {
            this._params.cases.push(when.params.cases[0]);
        }
        return this;
    }
    else(schema) {
        this._params.otherwise = schema;
        return this;
    }
    default(schema) {
        this._params.otherwise = schema;
        return this;
    }
}
exports.When = When;
exports.SchemaFnWhen = "__SchemaFnWhen__";
function when(prop) {
    let when = new When(prop);
    let fn = function (target, propertyKey, descriptor) {
        let validations = index_1.Reflector.getMetadata(registerDecorator_1.PropertySymbol, target, undefined, {});
        validations[propertyKey] = when;
    };
    fn[exports.SchemaFnWhen] = when;
    let fnNames = ["default", "else", "case", "then", "schema", "group", "fn", "value", "refFn", "ref", "property"];
    for (let i = 0; i < fnNames.length; i++) {
        let fnName = fnNames[i];
        fn[fnName] = function () {
            let when = fn[exports.SchemaFnWhen];
            when[fnName].apply(when, arguments);
            return fn;
        };
    }
    Object.defineProperty(fn, "params", {
        get: function () {
            return when.params;
        }
    });
    Object.defineProperty(fn, "is", {
        get: function () {
            return fn;
        }
    });
    return fn;
}
exports.when = when;
//# sourceMappingURL=when.js.map