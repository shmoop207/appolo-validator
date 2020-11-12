"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerConstraint = exports.RegisterConstraint = void 0;
const utils_1 = require("@appolo/utils");
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
                options: utils_1.Objects.isPlain(options) ? options : {},
                whiteList: params.whiteList,
                blackList: params.blackList,
                inject: params.inject
            };
            this.addConstraint(config);
            return this;
        };
    }
    // private static _hasRef(args: any[]) {
    //     for (let i = 0; i < args.length; i++) {
    //         if (args[i] instanceof Ref) {
    //             return true;
    //         }
    //     }
    //
    //     return false;
    // }
    get constraints() {
        return this._constraints;
    }
}
exports.RegisterConstraint = RegisterConstraint;
exports.registerConstraint = new RegisterConstraint();
//# sourceMappingURL=registerConstraint.js.map