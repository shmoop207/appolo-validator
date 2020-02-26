"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const index_1 = require("../index");
let should = chai.should();
describe("validator", function () {
    describe("Numbers", () => {
        it('should validate isNumber', async () => {
            let validator = await index_1.validation({});
            let schema = index_1.number();
            let result = await validator.validate(schema, 5);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "5");
            result.errors[0].message.should.be.eq("5 is not a number");
            result.errors[0].type.should.be.eq("number");
        });
        it('should validate min number', async () => {
            let validator = await index_1.validation({});
            let schema = index_1.number().min(5);
            let result = await validator.validate(schema, 5);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 3);
            result.errors[0].message.should.be.eq("3 min that was expected for this number");
            result.errors[0].type.should.be.eq("minNumber");
        });
        it('should validate with convert numbers', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.object().keys({ a: index_1.number(), b: index_1.number() }).options({ convert: true });
            result = await validator.validate(schema, { a: 1, b: "11" });
            result.errors.length.should.be.eq(0);
            result.value.b.should.be.eq(11);
            schema = index_1.object().keys({ a: index_1.number(), b: index_1.number() });
            result = await validator.validate(schema, { a: 1, b: "11" });
            result.errors[0].constraints.length.should.be.eq(1);
            result.errors[0].constraints[0].message.should.be.eq('11 is not a number');
        });
        it('should validate with convert precision', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.object().keys({ a: index_1.number(), b: index_1.number().toPrecision(2) }).options({ convert: true });
            result = await validator.validate(schema, { a: 1, b: "11.6677" });
            result.errors.length.should.be.eq(0);
            result.value.b.should.be.eq(11.67);
        });
    });
    it('should validate array', async () => {
        let validator = await index_1.validation();
        let schema = index_1.array().items(index_1.number());
        let result = await validator.validate(schema, [5, "aa"]);
        result.errors.length.should.be.eq(1);
        result.errors[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].message.should.be.eq('aa is not a number');
    });
    it('should validate array or', async () => {
        let validator = await index_1.validation();
        let schema = index_1.array().items(index_1.number().or(index_1.string()));
        let result = await validator.validate(schema, [5, "aa"]);
        result.errors.length.should.be.eq(0);
        result.value.should.be.deep.equal([5, "aa"]);
    });
    it('should validate array or array', async () => {
        let validator = await index_1.validation();
        let schema = index_1.array().items([index_1.number(), index_1.string()]);
        let result = await validator.validate(schema, [5, "aa"]);
        result.errors.length.should.be.eq(0);
        result.value.should.be.deep.equal([5, "aa"]);
    });
    describe("When", () => {
        it('should validate object when', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                min: index_1.number(),
                max: index_1.when().fn(params => params.object.min == 5).then(index_1.number().min(5))
            });
            let result = await validator.validate(schema, { min: 5, max: 4 });
            result.errors.length.should.be.eq(1);
            result.errors[0].constraints.length.should.be.eq(1);
            result.errors[0].constraints[0].message.should.be.eq('4 min that was expected for this number');
        });
        it('should validate object when with schema', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                min: index_1.number(),
                max: index_1.when().ref("min").schema(index_1.number().valid([5])).then(index_1.number().min(6))
            });
            let result = await validator.validate(schema, { min: 5, max: 4 });
            result.errors.length.should.be.eq(1);
            result.errors[0].constraints.length.should.be.eq(1);
            result.errors[0].constraints[0].message.should.be.eq('4 min that was expected for this number');
            let result2 = await validator.validate(schema, { min: 5, max: 7 });
            result2.errors.length.should.be.eq(0);
        });
        it('should validate object when with group', async () => {
            let validator = await index_1.validation({ groups: ["test"] });
            let schema = index_1.object().keys({
                min: index_1.number(),
                max: index_1.when().group("test").then(index_1.number().min(5))
            });
            let result = await validator.validate(schema, { min: 5, max: 4 });
            result.errors.length.should.be.eq(1);
            result.errors[0].constraints.length.should.be.eq(1);
            result.errors[0].constraints[0].message.should.be.eq('4 min that was expected for this number');
        });
        it('should validate object when with group else', async () => {
            let validator = await index_1.validation({ groups: ["test"] });
            let schema = index_1.object().keys({
                min: index_1.number(),
                max: index_1.when().group("test2")
                    .then(index_1.number().min(5))
                    .else(index_1.number().min(7))
            });
            let result = await validator.validate(schema, { min: 5, max: 6 });
            result.errors.length.should.be.eq(1);
            result.errors[0].constraints.length.should.be.eq(1);
            result.errors[0].constraints[0].message.should.be.eq('6 min that was expected for this number');
        });
        it('should validate object when with switch', async () => {
            let validator = await index_1.validation({ groups: ["test"] });
            let schema = index_1.object().keys({
                min: index_1.number(),
                max: index_1.when()
                    .case(index_1.when().group("test2").then(index_1.number().min(5)))
                    .case(index_1.when().group("test").then(index_1.number().min(6)))
                    .default(index_1.number().min(8))
            });
            let result = await validator.validate(schema, { min: 5, max: 5 });
            result.errors.length.should.be.eq(1);
            result.errors[0].constraints.length.should.be.eq(1);
            result.errors[0].constraints[0].message.should.be.eq('5 min that was expected for this number');
        });
    });
    it('should validate nested array', async () => {
        let validator = await index_1.validation();
        let schema = index_1.array().items(index_1.array().items(index_1.number()));
        let result = await validator.validate(schema, [[5], ["aa"]]);
        result.errors.length.should.be.eq(1);
        result.errors[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].message.should.be.eq('is not a valid array');
        result.errors[0].constraints[0].property.should.be.eq(1);
        result.errors[0].constraints[0].constraints[0].message.should.be.eq('aa is not a number');
        result.errors[0].constraints[0].constraints[0].property.should.be.eq(0);
    });
    it('should validate object', async () => {
        let validator = await index_1.validation();
        let schema = index_1.object().keys({ a: index_1.number(), b: index_1.number() });
        let result = await validator.validate(schema, { a: 1, b: "11" });
        result.errors.length.should.be.eq(1);
        result.errors[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].message.should.be.eq('11 is not a number');
    });
    it('should validate nested object', async () => {
        let validator = await index_1.validation();
        let schema = index_1.object()
            .keys({
            a: index_1.object()
                .keys({
                b: index_1.array().items(index_1.number())
            })
        });
        let result = await validator.validate(schema, { a: { b: [11, "bb"] } });
        result.errors[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].constraints[0].message.should.be.eq('is not a valid array');
        result.errors[0].constraints[0].constraints[0].constraints[0].message.should.be.eq("bb is not a number");
    });
    it('should validate with stripUnknown', async () => {
        let result;
        let validator = await index_1.validation();
        let schema = index_1.object().keys({
            a: index_1.number({}),
            b: index_1.number({}).optional(),
        });
        result = await validator.validate(schema, { a: 1, c: 1 }, {});
        result.errors.length.should.be.eq(0);
        result.value.should.be.deep.equal({ a: 1, c: 1 });
        result = await validator.validate(schema, { a: 1, c: 1 }, { stripUnknown: true });
        result.value.should.be.deep.equal({ a: 1 });
    });
    it('should validate with allow', async () => {
        let result;
        let validator = await index_1.validation();
        let schema = index_1.object().keys({
            a: index_1.number({}),
            b: index_1.number().allow([null, NaN]),
        });
        result = await validator.validate(schema, { a: 1, b: NaN }, {});
        result.errors.length.should.be.eq(0);
        result.value.should.be.deep.equal({ a: 1, b: NaN });
    });
    it('should validate with required', async () => {
        let result;
        let validator = await index_1.validation();
        let schema = index_1.object().keys({
            a: index_1.number({}).required(),
            b: index_1.number().required()
        });
        result = await validator.validate(schema, { a: 1 });
        result.errors[0].constraints.length.should.be.eq(1);
        result.errors[0].constraints[0].message.should.be.eq('b is required');
    });
    describe("Any Schema", () => {
        it('should validate with optional', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                a: index_1.number({}),
                b: index_1.number().optional()
            });
            result = await validator.validate(schema, { a: 1 });
            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal({ a: 1 });
        });
        it('should validate with default', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                a: index_1.number({}),
                b: index_1.number().default(2)
            });
            result = await validator.validate(schema, { a: 1 });
            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal({ a: 1, b: 2 });
        });
        it('should validate with forbidden', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                a: index_1.number({}),
                b: index_1.number().forbidden()
            });
            result = await validator.validate(schema, { a: 1, b: 2 });
            result.errors.length.should.be.eq(1);
            result.errors[0].constraints[0].message.should.be.deep.equal("b is forbidden");
        });
        it('should validate with invalid', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                a: index_1.number().invalid([1, 2, 3]),
                b: index_1.number().invalid([1, 2, 3])
            });
            result = await validator.validate(schema, { a: 4, b: 2 });
            result.errors.length.should.be.eq(1);
            result.errors[0].constraints[0].message.should.be.deep.equal("b is not valid");
        });
    });
    it('should validate with ref', async () => {
        let result;
        let validator = await index_1.validation();
        let schema = index_1.object().keys({
            a: index_1.number(),
            b: index_1.number().min(index_1.ref("a"))
        });
        result = await validator.validate(schema, { a: 4, b: 5 });
        result.errors.length.should.be.eq(0);
        result.value.should.be.deep.equal({ a: 4, b: 5 });
        result = await validator.validate(schema, { a: 4, b: 3 });
        result.errors.length.should.be.eq(1);
        result.errors[0].constraints[0].message.should.be.eq("3 min that was expected for this number");
    });
});
//# sourceMappingURL=unit.js.map