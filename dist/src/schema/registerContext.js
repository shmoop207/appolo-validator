"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterContext {
    constructor() {
        this._contexts = new Map();
    }
    extend(params) {
        if (!this._contexts.has(params.base)) {
            this._contexts.set(params.base, []);
        }
        this._contexts.get(params.base).push(params);
        params.base.prototype[params.name] = function () {
            let args = Array.from(arguments);
            let config = {
                args: args,
                context: params.context,
            };
            this.addContext(config);
            return this;
        };
    }
    get contexts() {
        return this._contexts;
    }
}
exports.RegisterContext = RegisterContext;
exports.registerContext = new RegisterContext();
//# sourceMappingURL=registerContext.js.map