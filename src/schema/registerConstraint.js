"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
class RegisterConstraint {
    extend(params) {
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
}
exports.RegisterConstraint = RegisterConstraint;
exports.registerConstraint = new RegisterConstraint();
//# sourceMappingURL=registerConstraint.js.map