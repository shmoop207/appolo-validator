"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
const registerConstraint_1 = require("../schema/registerConstraint");
const registerConverter_1 = require("../schema/registerConverter");
exports.PropertySymbol = "__PropertySymbol__";
exports.SchemaFnSymbol = "@schema";
class RegisterDecorator {
    extend(params) {
        let { schema } = params;
        let fn = function (target, propertyKey, descriptor) {
            let validations = appolo_utils_1.ReflectMetadata.getNestedMetadata(exports.PropertySymbol, target, {});
            validations[propertyKey] = schema;
        };
        fn[exports.SchemaFnSymbol] = schema;
        let schemaProto = Object.getPrototypeOf(schema);
        let fnNames = [{ name: "options" }];
        while (schemaProto) {
            fnNames.push(...registerConstraint_1.registerConstraint.constraints.get(schemaProto.constructor) || []);
            fnNames.push(...registerConverter_1.registerConverter.converters.get(schemaProto.constructor) || []);
            schemaProto = Object.getPrototypeOf(schemaProto);
        }
        for (let i = 0; i < fnNames.length; i++) {
            let constraint = fnNames[i];
            fn[constraint.name] = function () {
                let schema = fn[exports.SchemaFnSymbol];
                schema[constraint.name].apply(schema, arguments);
                return fn;
            };
        }
        return fn;
    }
}
exports.RegisterDecorator = RegisterDecorator;
exports.registerDecorator = new RegisterDecorator();
//# sourceMappingURL=registerDecorator.js.map