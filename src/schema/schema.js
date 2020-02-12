"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("appolo-utils/index");
const defaults_1 = require("../defaults/defaults");
const anySchema_1 = require("./types/anySchema");
const numberSchema_1 = require("./types/numberSchema");
const arraySchema_1 = require("./types/arraySchema");
const objectSchema_1 = require("./types/objectSchema");
class Schema {
    constructor(options = {}) {
        this._options = index_1.Objects.defaults({}, options, defaults_1.SchemaDefaults);
    }
    any(options) {
        return new anySchema_1.AnySchema(options, this._options);
    }
    number(options) {
        return new numberSchema_1.NumberSchema(options, this._options);
    }
    array(schema, options) {
        return new arraySchema_1.ArraySchema(schema, options, this._options);
    }
    object(schemaIndex, options) {
        return new objectSchema_1.ObjectSchema(schemaIndex, options, this._options);
    }
}
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map