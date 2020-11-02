"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ref = exports.Ref = void 0;
const utils_1 = require("@appolo/utils");
class Ref {
    constructor(key) {
        this.key = key;
    }
    geValue(params) {
        let key = utils_1.Classes.isFunction(this.key) ? this.key(params) : this.key;
        return params.object[key];
    }
}
exports.Ref = Ref;
function ref(key) {
    return new Ref(key);
}
exports.ref = ref;
//# sourceMappingURL=ref.js.map