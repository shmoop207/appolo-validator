"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
class RegisterConverter {
    extend(params) {
        params.base.prototype[params.name] = function () {
            let args = Array.from(arguments), options = args[args.length - 1];
            let config = {
                args: args,
                converter: params.converter,
                options: appolo_utils_1.Objects.isPlain(options) ? options : {},
            };
            this.addConverter(config);
            return this;
        };
    }
}
exports.RegisterConverter = RegisterConverter;
exports.registerConverter = new RegisterConverter();
//# sourceMappingURL=registerConverter.js.map