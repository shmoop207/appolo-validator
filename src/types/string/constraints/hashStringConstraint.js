"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashStringConstraint = void 0;
const registerConstraint_1 = require("../../../schema/registerConstraint");
const stringSchema_1 = require("../stringSchema");
class HashStringConstraint {
    constructor() {
        this.Lengths = {
            md5: 32,
            md4: 32,
            sha1: 40,
            sha256: 64,
            sha384: 96,
            sha512: 128,
            ripemd128: 32,
            ripemd160: 40,
            tiger128: 32,
            tiger160: 40,
            tiger192: 48,
            crc32: 8,
            crc32b: 8,
        };
    }
    validate(params) {
        const value = params.value;
        return { isValid: typeof value == "string" && new RegExp(`^[a-fA-F0-9]{${this.Lengths[params.args[0]]}}$`).test(value) };
    }
    get type() {
        return "string";
    }
    get defaultMessage() {
        return "${property} is not valid hash string";
    }
}
exports.HashStringConstraint = HashStringConstraint;
registerConstraint_1.registerConstraint.extend({
    base: stringSchema_1.StringSchema,
    name: "hash",
    constraint: HashStringConstraint
});
//# sourceMappingURL=hashStringConstraint.js.map