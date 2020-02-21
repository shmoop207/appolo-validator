"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const index_1 = require("../index");
let should = chai.should();
describe("validator", function () {
    it('should validate isNumber', async () => {
        let val = await index_1.validator({});
        let schem = index_1.schema().number();
        let result = await val.validate(schem, 5);
        result.errors.length.should.be.eq(0);
        result = await val.validate(schem, "5");
        result.errors[0].message.should.be.eq("5 is not a number");
        result.errors[0].type.should.be.eq("number");
    });
    it('should validate min number', async () => {
        let val = await index_1.validator({});
        let schem = index_1.schema().number().min(5);
        let result = await val.validate(schem, 5);
        result.errors.length.should.be.eq(0);
        result = await val.validate(schem, 3);
        result.errors[0].message.should.be.eq("3 min that was expected for this number");
        result.errors[0].type.should.be.eq("minNumber");
    });
    it('should validate array', async () => {
        let val = await index_1.validator();
        let schem = index_1.schema().array(index_1.schema().number());
        let result = await val.validate(schem, [5, "aa"]);
        result.errors.length.should.be.eq(1);
        result.errors[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].message.should.be.eq('aa is not a number');
    });
    it('should validate nested array', async () => {
        let val = await index_1.validator();
        let schem = index_1.schema().array(index_1.schema().array(index_1.schema().number()));
        let result = await val.validate(schem, [[5], ["aa"]]);
        result.errors.length.should.be.eq(1);
        result.errors[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].message.should.be.eq('is not a valid array');
        result.errors[0].constraints[0].property.should.be.eq(1);
        result.errors[0].constraints[0].constraints[0].message.should.be.eq('aa is not a number');
        result.errors[0].constraints[0].constraints[0].property.should.be.eq(0);
    });
    it('should validate object', async () => {
        let val = await index_1.validator();
        let schem = index_1.schema().object({ a: index_1.schema().number(), b: index_1.schema().number() });
        let result = await val.validate(schem, { a: 1, b: "11" });
        result.errors.length.should.be.eq(1);
        result.errors[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].message.should.be.eq('11 is not a number');
    });
    it('should validate nested object', async () => {
        let val = await index_1.validator();
        let schem = index_1.schema().object({
            a: index_1.schema().object({ b: index_1.schema().array(index_1.schema().number()) })
        });
        let result = await val.validate(schem, { a: { b: [11, "bb"] } });
        result.errors[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].constraints[0].message.should.be.eq('is not a valid array');
        result.errors[0].constraints[0].constraints[0].constraints[0].message.should.be.eq("bb is not a number");
    });
    it('should validate convert', async () => {
        let result;
        let val = await index_1.validator();
        let schem = index_1.schema({ convert: true }).object({ a: index_1.schema().number(), b: index_1.schema().number() });
        result = await val.validate(schem, { a: 1, b: "11" });
        result.errors.length.should.be.eq(0);
        result.value.b.should.be.eq(11);
        schem = index_1.schema({}).object({ a: index_1.schema().number(), b: index_1.schema().number() });
        result = await val.validate(schem, { a: 1, b: "11" });
        result.errors[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].message.should.be.eq('11 is not a number');
    });
    it('should validate with stripUnknown', async () => {
        let result;
        let val = await index_1.validator();
        let schem = index_1.schema()
            .object({
            a: index_1.schema().number({}),
            b: index_1.schema().number({}).optional(),
        });
        result = await val.validate(schem, { a: 1, c: 1 }, {});
        result.errors.length.should.be.eq(0);
        result.value.should.be.deep.equal({ a: 1, c: 1 });
        result = await val.validate(schem, { a: 1, c: 1 }, { stripUnknown: true });
        result.value.should.be.deep.equal({ a: 1 });
    });
    it('should validate with allow', async () => {
        let result;
        let val = await index_1.validator();
        let schem = index_1.schema()
            .object({
            a: index_1.schema().number({}),
            b: index_1.schema().number().allow([null, NaN]),
        });
        result = await val.validate(schem, { a: 1, b: NaN }, {});
        result.errors.length.should.be.eq(0);
        result.value.should.be.deep.equal({ a: 1, b: NaN });
    });
    it('should validate with required', async () => {
        let result;
        let val = await index_1.validator();
        let schem = index_1.schema()
            .object({
            a: index_1.schema().number({}).required(),
            b: index_1.schema().number().required()
        });
        result = await val.validate(schem, { a: 1 });
        result.errors[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].message.should.be.eq('b is required');
    });
    it('should validate with optional', async () => {
        let result;
        let val = await index_1.validator();
        let schem = index_1.schema()
            .object({
            a: index_1.schema().number({}),
            b: index_1.schema().number().optional()
        });
        result = await val.validate(schem, { a: 1 });
        result.errors.length.should.be.eq(0);
        result.value.should.be.deep.equal({ a: 1 });
    });
});
//# sourceMappingURL=unit.js.map