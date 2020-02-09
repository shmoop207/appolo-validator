"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const index_1 = require("../index");
let should = chai.should();
describe("decorator", function () {
    it('should call throttle', async () => {
        let result;
        let validator = await index_1.createValidator({ whitelist: true });
        result = await validator.schema().isNumber().validate(5);
        should.not.exist(result.error);
        result = await validator.schema().isNumber().validate("5");
        result.error.constraints["IsNumber"].should.be.eq("5 is not a number");
    });
});
//# sourceMappingURL=unit.js.map