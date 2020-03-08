"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai = require("chai");
const index_1 = require("../index");
let should = chai.should();
describe("validator", function () {
    describe("When", () => {
        it('should validate object when', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                min: index_1.number(),
                max: index_1.when().fn(params => params.object.min == 5).then(index_1.number().min(5))
            });
            let result = await validator.validate(schema, { min: 5, max: 4 });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('max must be larger than 5');
        });
        it('should validate object when with schema', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                min: index_1.number(),
                max: index_1.when().ref("min").schema(index_1.number().valid([5])).then(index_1.number().min(6))
            });
            let result = await validator.validate(schema, { min: 5, max: 4 });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('max must be larger than 6');
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
            result.errors[0].message.should.be.eq('max must be larger than 5');
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
            result.errors[0].message.should.be.eq('max must be larger than 7');
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
            result.errors[0].message.should.be.eq('max must be larger than 6');
        });
    });
    describe("Numbers", () => {
        it('should validate isNumber', async () => {
            let validator = await index_1.validation({});
            let schema = index_1.number();
            let result = await validator.validate(schema, 5);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "5");
            result.errors[0].message.should.be.eq("value must be a number");
            result.errors[0].type.should.be.eq("number");
        });
        it('should validate min number', async () => {
            let validator = await index_1.validation({});
            let schema = index_1.number().min(5);
            let result = await validator.validate(schema, 5);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 3);
            result.errors[0].message.should.be.eq("value must be larger than 5");
            result.errors[0].type.should.be.eq("minNumber");
        });
        it('should validate with convert numbers', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.object().keys({ a: index_1.number(), b: index_1.number() }).options({ convert: true });
            result = await validator.validate(schema, { a: 1, b: "11" });
            result.errors.length.should.be.eq(0);
            result.value.b.should.be.eq(11);
            // schema = object().keys({a: number(), b: number()});
            //
            // result = await validator.validate(schema, {a: 1, b: "11"});
            //
            // result.errors.length.should.be.eq(1);
            // result.errors[0].message.should.be.eq('b must be a number');
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
    describe("Arrays", () => {
        it('should validate array', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().items(index_1.number());
            let result = await validator.validate(schema, [5, "aa"]);
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('[1] must be a number');
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
        it('should validate nested array', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().items(index_1.array().items(index_1.number()));
            let result = await validator.validate(schema, [[5], ["aa"]]);
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('[1][0] must be a number');
            result.errors[0].property.should.be.eq(0);
        });
    });
    describe("Function", () => {
        it('should validate function isClass ', async () => {
            let validator = await index_1.validation();
            let schema = index_1.func().isClass();
            let result = await validator.validate(schema, function () {
            });
            result.errors[0].message.should.be.eq('value is not valid class');
            result = await validator.validate(schema, class A {
            });
            result.errors.length.should.be.eq(0);
        });
        it('should validate function args size', async () => {
            let validator = await index_1.validation();
            let schema = index_1.func().argsSize(3);
            let result = await validator.validate(schema, function (a, b) {
            });
            result.errors[0].message.should.be.eq('value has invalid arguments size');
            result = await validator.validate(schema, function (a, b, c) {
            });
            result.errors.length.should.be.eq(0);
        });
        it('should validate function min args size', async () => {
            let validator = await index_1.validation();
            let schema = index_1.func().minArgs(3);
            let result = await validator.validate(schema, function (a, b) {
            });
            result.errors[0].message.should.be.eq('value args is under min args size');
            result = await validator.validate(schema, function (a, b, c, d) {
            });
            result.errors.length.should.be.eq(0);
        });
        it('should validate function max args size', async () => {
            let validator = await index_1.validation();
            let schema = index_1.func().maxArgs(3);
            let result = await validator.validate(schema, function (a, b, c, d) {
            });
            result.errors[0].message.should.be.eq('value args is over max args size');
            result = await validator.validate(schema, function (a, b) {
            });
            result.errors.length.should.be.eq(0);
        });
    });
    describe("Object", () => {
        it('should validate object', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().keys({ a: index_1.number(), b: index_1.number() });
            let result = await validator.validate(schema, { a: 1, b: "11" });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('b must be a number');
        });
        it('should validate plain object', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().isPlain();
            let result = await validator.validate(schema, { a: 1, b: "11" });
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, class A {
            });
            result.errors[0].message.should.be.eq('value is not valid object');
        });
        it('should validate object size', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().size(2);
            let result = await validator.validate(schema, { a: 1, b: "11" });
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, {});
            result.errors[0].message.should.be.eq('value has invalid keys size');
        });
        it('should validate object min', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().minKeys(2);
            let result = await validator.validate(schema, { a: 1, b: "11" });
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, {});
            result.errors[0].message.should.be.eq('value has invalid min keys size');
        });
        it('should validate object max', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().maxKeys(2);
            let result = await validator.validate(schema, { a: 1, b: "11" });
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, { a: 1, b: "11", c: "11" });
            result.errors[0].message.should.be.eq('value has invalid max keys size');
        });
        it('should validate object with', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().with("a", ["b"]);
            let result = await validator.validate(schema, { a: 1, b: "11" });
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, { a: 1 });
            result.errors[0].message.should.be.eq('value has invalid keys');
        });
        it('should validate object without', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().without("a", ["b"]);
            let result = await validator.validate(schema, { a: 1 });
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, { a: 1, b: 11 });
            result.errors[0].message.should.be.eq('value has invalid keys');
        });
        it('should validate object instanceOf ', async () => {
            let validator = await index_1.validation();
            class A {
            }
            class B {
            }
            let schema = index_1.object().instanceOf(A);
            let result = await validator.validate(schema, new B());
            result.errors[0].message.should.be.eq('value is not instanceof');
            result = await validator.validate(schema, new A());
            result.errors.length.should.be.eq(0);
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
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("a.b[1] must be a number");
            result.errors[0].parents.length.should.be.eq(2);
        });
    });
    describe("Any Schema", () => {
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
            result.errors[0].message.should.be.eq('b is required');
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
            result.errors[0].message.should.be.eq("b must be larger than 4");
        });
        it('should validate with and', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                a: index_1.number(),
                b: index_1.and([index_1.number().min(3), index_1.number().max(5)])
            });
            result = await validator.validate(schema, { a: 4, b: 4 });
            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal({ a: 4, b: 4 });
            result = await validator.validate(schema, { a: 4, b: 6 });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("b must be smaller than 5");
        });
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
        it('should validate with await promise', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                a: index_1.number().await(),
            });
            result = await validator.validate(schema, { a: Promise.resolve(1) });
            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal({ a: 1 });
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
            result.errors[0].message.should.be.deep.equal("b is forbidden");
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
            result.errors[0].message.should.be.deep.equal("b has invalid values");
        });
    });
    describe("Date", () => {
        it("should convert date", async () => {
            let validator = await index_1.validation();
            let schema = index_1.date().toDate();
            let result = await validator.validate(schema, "2019-02-01 11:44");
            result.errors.length.should.be.eq(0);
            result.value.should.be.instanceOf(Date);
            result.value.toString().should.include("11:44:00");
            result = await validator.validate(schema, "2019-02--01 11:44");
            result.errors.length.should.be.eq(1);
        });
        it("should convert date with format", async () => {
            let validator = await index_1.validation();
            let schema = index_1.date().toDate("dd/MM/yyyy HH:mm:ss X");
            let result = await validator.validate(schema, "01/02/2001 11:44:11 +00");
            result.errors.length.should.be.eq(0);
            result.value.should.be.instanceOf(Date);
            result.value.toUTCString().should.include("11:44:11");
            result = await validator.validate(schema, "2019-02--01 11:44");
            result.errors.length.should.be.eq(1);
        });
        it("should validate date with min", async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                from: index_1.date().toDate().required(),
                to: index_1.date().toDate().min(index_1.ref('from')).required()
            });
            let result = await validator.validate(schema, { from: "2020-01-02", to: "2020-03-01" });
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, { from: "2020-01-02", to: "2020-01-01" });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("to is under min date");
        });
        it("should validate date with max", async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                from: index_1.date().toDate().required(),
                to: index_1.date().toDate().max("2020-01-02").required()
            });
            let result = await validator.validate(schema, { from: "2020-01-02", to: "2020-01-01" });
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, { from: "2020-01-01", to: "2020-03-01" });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("to is over max date");
        });
    });
    describe("Decorators", () => {
        it('should validate decorators', async () => {
            let A = class A {
            };
            tslib_1.__decorate([
                index_1.number().min(5)
            ], A.prototype, "a", void 0);
            A = tslib_1.__decorate([
                index_1.schema(index_1.object().required())
            ], A);
            let validator = await index_1.validation();
            let result = await validator.validate(A, { a: 6 });
            result.errors.length.should.be.eq(0);
        });
        it('should validate decorators with inherit', async () => {
            class C {
            }
            tslib_1.__decorate([
                index_1.number().min(5).required()
            ], C.prototype, "c", void 0);
            tslib_1.__decorate([
                index_1.number().min(5).required()
            ], C.prototype, "d", void 0);
            class B extends C {
            }
            tslib_1.__decorate([
                index_1.number().min(5).required()
            ], B.prototype, "b", void 0);
            class A extends B {
            }
            tslib_1.__decorate([
                index_1.number().min(5).required()
            ], A.prototype, "a", void 0);
            let validator = await index_1.validation();
            let result = await validator.validate(A, { a: 6, d: 1 });
            result.errors.length.should.be.eq(3);
            result.errors[0].message.should.be.eq("d must be larger than 5");
            result.errors[1].message.should.be.eq("c is required");
            result = await validator.validate(A, { a: 6, b: 6, c: 6, d: 6 });
            result.errors.length.should.be.eq(0);
        });
    });
    describe("messages", () => {
        it("should have nested message", async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                test: index_1.object().keys({ a: index_1.array().items(index_1.object().keys({ a: index_1.number() })) }),
            });
            let result = await validator.validate(schema, { test: { a: [{ a: "aa" }] } });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("test.a[0].a must be a number");
        });
        it("should have nested custom message", async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                test: index_1.object().keys({
                    a: index_1.array().items(index_1.object().keys({
                        a: index_1.number({ message: "${property} not a number" })
                    }))
                }),
            });
            let result = await validator.validate(schema, { test: { a: [{ a: "aa" }] } });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("test.a[0].a not a number");
        });
    });
});
//# sourceMappingURL=unit.js.map