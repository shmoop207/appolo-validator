"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
class Ref {
    constructor(key) {
        this.key = key;
    }
    geValue(params) {
        let key = appolo_utils_1.Classes.isFunction(this.key) ? this.key(params) : this.key;
        return params.object[key];
    }
}
exports.Ref = Ref;
function ref(key) {
    return new Ref(key);
}
exports.ref = ref;
//# sourceMappingURL=ref.js.map