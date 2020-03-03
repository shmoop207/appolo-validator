"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
class RegisterConstraint {
    constructor() {
        this._constraints = new Map();
    }
    extend(params) {
        if (!this._constraints.has(params.base)) {
            this._constraints.set(params.base, []);
        }
        this._constraints.get(params.base).push(params);
        params.base.prototype[params.name] = function () {
            let args = Array.from(arguments), options = args[args.length - 1];
            let config = {
                args: args,
                constraint: params.constraint,
                options: appolo_utils_1.Objects.isPlain(options) ? options : {},
                whiteList: params.whiteList,
                blackList: params.blackList
            };
            this.addConstraint(config);
            return this;
        };
    }
    get constraints() {
        return this._constraints;
    }
}
exports.RegisterConstraint = RegisterConstraint;
exports.registerConstraint = new RegisterConstraint();
//# sourceMappingURL=registerConstraint.js.map