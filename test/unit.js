"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const index_1 = require("../index");
let should = chai.should();
describe("validator", function () {
    it('should validate isNumber', async () => {
        let result;
        let val = await index_1.validator({ whitelist: true });
        let schem = index_1.schema().number();
        result = await val.validate(schem, 5);
        should.not.exist(result.error);
        result = await val.validate(schem, "5");
        result.error.constraints[0].message.should.be.eq("5 is not a number");
        result.error.constraints[0].type.should.be.eq("number");
    });
    it('should validate min number', async () => {
        let result;
        let val = await index_1.validator({});
        let schem = index_1.schema().number().min(5);
        result = await val.validate(schem, 5);
        should.not.exist(result.error);
        result = await val.validate(schem, 3);
        result.error.constraints[0].message.should.be.eq("5 is not a number");
        result.error.constraints[0].type.should.be.eq("number");
    });
    it('should validate array', async () => {
        let result;
        let val = await index_1.validator();
        let schem = index_1.schema().array(index_1.schema().number());
        result = await val.validate(schem, [5, "aa"]);
        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints[0].message.should.be.eq('aa is not a number');
    });
    it('should validate nested array', async () => {
        let result;
        let val = await index_1.validator();
        let schem = index_1.schema().array(index_1.schema().array(index_1.schema().number()));
        result = await val.validate(schem, [[5], ["aa"]]);
        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints[0].message.should.be.eq('is not a valid array');
        result.error.constraints[0].constraints[0].property.should.be.eq(1);
        result.error.constraints[0].constraints[0].constraints[0].message.should.be.eq('aa is not a number');
        result.error.constraints[0].constraints[0].constraints[0].property.should.be.eq(0);
    });
    it('should validate object', async () => {
        let result;
        let val = await index_1.validator();
        let schem = index_1.schema().object({ a: index_1.schema().number(), b: index_1.schema().number() });
        result = await val.validate(schem, { a: 1, b: "11" });
        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints[0].message.should.be.eq('11 is not a number');
    });
    it('should validate nested object', async () => {
        let result;
        let val = await index_1.validator();
        let schem = index_1.schema().object({ a: index_1.schema().object({ b: index_1.schema().array(index_1.schema().number()) }) });
        result = await val.validate(schem, { a: { b: [11, "bb"] } });
        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints[0].message.should.be.eq('is not a valid object');
        result.error.constraints[0].constraints[0].constraints[0].message.should.be.eq('is not a valid array');
        result.error.constraints[0].constraints[0].constraints[0].constraints[0].message.should.be.eq("bb is not a number");
    });
    it('should validate convert', async () => {
        let result;
        let val = await index_1.validator();
        let schem = index_1.schema({ convert: true }).object({ a: index_1.schema().number(), b: index_1.schema().number() });
        result = await val.validate(schem, { a: 1, b: "11" });
        should.not.exist(result.error);
        result.value.b.should.be.eq(11);
        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints[0].message.should.be.eq('11 is not a number');
    });
    it.only('should validate with groups', async () => {
        let result;
        let val = await index_1.validator();
        let schem = index_1.schema()
            .object({
            a: index_1.schema().number({ groups: ["test"] }),
            b: index_1.schema().number({ groups: ["test2"] }),
            c: index_1.schema().number()
        });
        result = await val.validate(schem, { a: 1, b: "11" }, { groups: ["test1"] });
        should.not.exist(result.error);
        result.value.b.should.be.eq("11");
        result = await val.validate(schem, { a: 1, b: "11", c: "22" }, { groups: ["test1", "test2"] });
        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(2);
        result.error.constraints[0].constraints[0].message.should.be.eq('11 is not a number');
        result = await val.validate(schem, { a: 1, b: "11" }, {});
        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints[0].message.should.be.eq('11 is not a number');
    });
});
//# sourceMappingURL=unit.js.map