"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerConverter = exports.RegisterConverter = void 0;
const utils_1 = require("@appolo/utils");
class RegisterConverter {
    constructor() {
        this._converters = new Map();
    }
    extend(params) {
        if (!this._converters.has(params.base)) {
            this._converters.set(params.base, []);
        }
        this._converters.get(params.base).push(params);
        params.base.prototype[params.name] = function () {
            let args = Array.from(arguments), options = args[args.length - 1];
            let config = {
                args: args,
                converter: params.converter,
                options: utils_1.Objects.isPlain(options) ? options : {},
            };
            this.addConverter(config);
            return this;
        };
    }
    get converters() {
        return this._converters;
    }
}
exports.RegisterConverter = RegisterConverter;
exports.registerConverter = new RegisterConverter();
//# sourceMappingURL=registerConverter.js.map