"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai = require("chai");
const appolo_utils_1 = require("appolo-utils");
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
        it('should validate object when with group not exists', async () => {
            let validator = await index_1.validation({});
            let schema = index_1.object().keys({
                min: index_1.number(),
                max: index_1.number().min(5).groups("test")
            });
            let result = await validator.validate(schema, { min: 5, max: 4 });
            result.errors.length.should.be.eq(0);
        });
        it('should validate object when with group obj', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                min: index_1.number(),
                max: index_1.number({ groups: ["test"] }).min(5)
            });
            let result = await validator.validate(schema, { min: 5, max: 4 }, { groups: ["test"] });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('max must be larger than 5');
            result = await validator.validate(schema, { min: 5, max: 4 }, { groups: ["test2"] });
            result.errors.length.should.be.eq(0);
        });
        it('should validate object when with group fn', async () => {
            let validator = await index_1.validation();
            let schema = index_1.object().keys({
                min: index_1.number(),
                max: index_1.number().min(5).groups(["test"])
            });
            let result = await validator.validate(schema, { min: 5, max: 4 }, { groups: ["test"] });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('max must be larger than 5');
            result = await validator.validate(schema, { min: 5, max: 4 }, { groups: ["test2"] });
            result.errors.length.should.be.eq(0);
        });
        it('should validate group and strip unknown ', async () => {
            let validator = await index_1.validation({ stripUnknown: true });
            let schema = index_1.object().keys({
                min: index_1.number(),
                max: index_1.number().min(5).groups(["test"])
            });
            let result = await validator.validate(schema, { min: 5, max: 4 }, { groups: ["test"] });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('max must be larger than 5');
            result = await validator.validate(schema, { min: 5, max: 4 }, { groups: ["test2"] });
            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.eq({ min: 5 });
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
        it('should validate with number positive', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.number().positive();
            result = await validator.validate(schema, 1);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, -1);
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("value must be a positive number");
        });
        it('should validate with number negative', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.number().negative();
            result = await validator.validate(schema, -1);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 1);
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("value must be a negative number");
        });
        it('should validate with number integer', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.number().integer().positive();
            result = await validator.validate(schema, 123);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 123.3);
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("value must be an integer number");
        });
        it('should validate with number multiple', async () => {
            let result;
            let validator = await index_1.validation();
            let schema = index_1.number().integer().positive().multiple(5);
            result = await validator.validate(schema, 20);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 21);
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("value must be divided by the multiple 5 ");
        });
        it('should validate port', async () => {
            let validator = await index_1.validation({});
            let schema = index_1.number().port();
            let result = await validator.validate(schema, 8080);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 8434243);
            result.errors[0].message.should.be.eq("value must be a valid port");
        });
    });
    describe("Boolean", () => {
        it('should validate boolean', async () => {
            let validator = await index_1.validation();
            let schema = index_1.boolean();
            let result = await validator.validate(schema, true);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "true");
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('value is not valid boolean');
        });
        it('should validate boolean convert', async () => {
            let validator = await index_1.validation({ convert: true });
            let schema = index_1.boolean({ truthy: ["yes"], falsy: ["no"] });
            let result = await validator.validate(schema, "true");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 0);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "yes");
            result.errors.length.should.be.eq(0);
            result.value.should.be.eq(true);
            result = await validator.validate(schema, "true1");
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('value is not valid boolean');
        });
    });
    describe("Buffers", () => {
        it('should validate buffer', async () => {
            let validator = await index_1.validation();
            let schema = index_1.buffer();
            let result = await validator.validate(schema, Buffer.from("Hello World"));
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "Hello World");
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('value is not valid buffer');
        });
        it('should validate convert to  buffer', async () => {
            let validator = await index_1.validation();
            let schema = index_1.buffer().toBuffer('base64');
            let result = await validator.validate(schema, "SGVsbG8gV29ybGQ=");
            result.errors.length.should.be.eq(0);
            result.value.toString('ascii').should.be.eq("Hello World");
        });
        it('should validate buffer size', async () => {
            let validator = await index_1.validation();
            let schema = index_1.buffer().toBuffer('base64').size(11);
            let result = await validator.validate(schema, "SGVsbG8gV29ybGQ=");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "SGVsbG8gV29ybG=");
            result.errors[0].message.should.be.eq('value buffer has invalid length');
        });
        it('should validate buffer min', async () => {
            let validator = await index_1.validation();
            let schema = index_1.buffer().toBuffer('base64').min(11);
            let result = await validator.validate(schema, "SGVsbG8gV29ybGQ=");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "SGVsbG8gV29ybG=");
            result.errors[0].message.should.be.eq('value contains less bytes then 11');
        });
        it('should validate buffer max', async () => {
            let validator = await index_1.validation();
            let schema = index_1.buffer().toBuffer('base64').max(11);
            let result = await validator.validate(schema, "SGVsbG8gV29ybGQ=");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "SGVsbG8gV29ybaaaG=");
            result.errors[0].message.should.be.eq('value contains more bytes then 11');
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
        it('should not validate array items on invalid array', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().items(index_1.number());
            let result = await validator.validate(schema, 5);
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('value is not valid array');
        });
        it('should validate array with object', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().items({ a: index_1.number(), b: index_1.number() });
            let result = await validator.validate(schema, [{ a: 5, b: "aa" }]);
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('[0].b must be a number');
            result = await validator.validate(schema, [{ a: 5, b: 1 }]);
            result.errors.length.should.be.eq(0);
        });
        it('should validate array contains', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().items(index_1.number()).contains(6);
            let result = await validator.validate(schema, [5, 6]);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, [5, 7]);
            result.errors[0].message.should.be.eq('value has invalid values');
            schema = index_1.array().items(index_1.object()).contains((item) => item.a == 5);
            result = await validator.validate(schema, [{ a: 5 }]);
            result.errors.length.should.be.eq(0);
        });
        it('should validate array size', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().items(index_1.number()).size(3);
            let result = await validator.validate(schema, [5, 6, 3]);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, [5, 7]);
            result.errors[0].message.should.be.eq('value has invalid size');
        });
        it('should validate array uniq', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().items(index_1.number()).uniq();
            let result = await validator.validate(schema, [5, 6, 3,]);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, [5, 7, 5]);
            result.errors[0].message.should.be.eq('value array is not uniq');
            schema = index_1.array().items(index_1.number()).uniq().toUniq();
            result = await validator.validate(schema, [5, 7, 5]);
            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal([5, 7]);
        });
        it('should validate array min size', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().items(index_1.number()).min(3);
            let result = await validator.validate(schema, [5, 6, 3]);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, [5, 7]);
            result.errors[0].message.should.be.eq('value has invalid min size');
        });
        it('should validate array order size', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().order([index_1.number(), index_1.string()]);
            let result = await validator.validate(schema, [5, "aa"]);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, [5, 7]);
            result.errors[0].message.should.be.eq('[1] is not valid string');
        });
        it('should sort array', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().items(index_1.number()).toSort().toUniq();
            let result = await validator.validate(schema, [5, 1, 3, 4, 7, 3]);
            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal([1, 3, 4, 5, 7]);
        });
        it('should validate array max size', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().items(index_1.number()).max(3);
            let result = await validator.validate(schema, [5, 6, 5]);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, [5, 7, 6, 6]);
            result.errors[0].message.should.be.eq('value has invalid max size');
        });
        it('should validate array has schema', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().items(index_1.number()).has(index_1.number().valid([1, 2, 3]));
            let result = await validator.validate(schema, [1]);
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, [5, 7, 6, 6]);
            result.errors[0].message.should.be.eq('value has invalid array values');
        });
        it('should validate array has schema with valid', async () => {
            let validator = await index_1.validation();
            let schema = index_1.array().items(index_1.object().keys({
                id: index_1.string().required(),
                level: index_1.string().valid(['debug', 'info', 'notice']).required()
            }));
            let result = await validator.validate(schema, [{ id: '1', level: 'info' },
                { id: '2', level: 'warning' }]);
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("[1].level has invalid value");
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
            let schema = index_1.date().format();
            let result = await validator.validate(schema, "2019-02-01 11:44");
            result.errors.length.should.be.eq(0);
            result.value.should.be.instanceOf(Date);
            result.value.toString().should.include("11:44:00");
            result = await validator.validate(schema, "2019-02--01 11:44");
            result.errors.length.should.be.eq(1);
        });
        it("should convert date timestamp", async () => {
            let validator = await index_1.validation();
            let schema = index_1.date().format("t");
            let result = await validator.validate(schema, "1583848620");
            result.errors.length.should.be.eq(0);
            result.value.should.be.instanceOf(Date);
            result.value.getTime().should.be.eq(1583848620000);
            schema = index_1.date().format("T");
            result = await validator.validate(schema, "1583848620000");
            result.errors.length.should.be.eq(0);
            result.value.should.be.instanceOf(Date);
            result.value.getTime().should.be.eq(1583848620000);
        });
        it("should convert date with format", async () => {
            let validator = await index_1.validation();
            let schema = index_1.date().format("dd/MM/yyyy HH:mm:ss X");
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
                from: index_1.date().format().required(),
                to: index_1.date().format().min(index_1.ref('from')).required()
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
                from: index_1.date().format().required(),
                to: index_1.date().format().max("2020-01-02").required()
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
                index_1.validate.number().min(5)
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
        it('should validate decorators with nested array', async () => {
            class B {
            }
            tslib_1.__decorate([
                index_1.number().min(5).required()
            ], B.prototype, "b", void 0);
            class A {
            }
            tslib_1.__decorate([
                index_1.array().items(B)
            ], A.prototype, "a", void 0);
            let validator = await index_1.validation();
            let result = await validator.validate(A, { a: [{ b: 4 }] });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("a[0].b must be larger than 5");
            result = await validator.validate(A, { a: [{ b: 6 }] });
            result.errors.length.should.be.eq(0);
        });
        it('should validate decorators with nested object', async () => {
            class B {
            }
            tslib_1.__decorate([
                index_1.number().min(5).required()
            ], B.prototype, "b", void 0);
            class A {
            }
            tslib_1.__decorate([
                index_1.object().keys(B)
            ], A.prototype, "a", void 0);
            let validator = await index_1.validation();
            let result = await validator.validate(A, { a: { b: 4 } });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("a.b must be larger than 5");
            result = await validator.validate(A, { a: { b: 6 } });
            result.errors.length.should.be.eq(0);
        });
        it('should validate decorators with nested object array', async () => {
            class C {
            }
            tslib_1.__decorate([
                index_1.number().min(5).required()
            ], C.prototype, "c", void 0);
            class B {
            }
            tslib_1.__decorate([
                index_1.object(C)
            ], B.prototype, "b", void 0);
            class A {
            }
            tslib_1.__decorate([
                index_1.array(B)
            ], A.prototype, "a", void 0);
            let validator = await index_1.validation();
            let result = await validator.validate(A, { a: [{ b: { c: 4 } }] });
            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("a[0].b.c must be larger than 5");
            result = await validator.validate(A, { a: [{ b: { c: 6 } }] });
            result.errors.length.should.be.eq(0);
        });
        it('should validate decorators with nested object array schema', async () => {
            let value = {
                "filter": "{}",
                "fields": "{}",
                "sort": "{}",
                "populate": ['{"path":"game","select":"name"}']
            };
            class GetAllModel {
            }
            tslib_1.__decorate([
                index_1.number().optional()
            ], GetAllModel.prototype, "page", void 0);
            tslib_1.__decorate([
                index_1.number().optional()
            ], GetAllModel.prototype, "pageSize", void 0);
            tslib_1.__decorate([
                index_1.object().optional()
            ], GetAllModel.prototype, "sort", void 0);
            tslib_1.__decorate([
                index_1.object().optional()
            ], GetAllModel.prototype, "filter", void 0);
            tslib_1.__decorate([
                index_1.object().optional()
            ], GetAllModel.prototype, "fields", void 0);
            tslib_1.__decorate([
                index_1.array(index_1.object()).optional()
            ], GetAllModel.prototype, "populate", void 0);
            tslib_1.__decorate([
                index_1.boolean().optional()
            ], GetAllModel.prototype, "lean", void 0);
            let validator = await index_1.validation();
            let result = await validator.validate(GetAllModel, value, { convert: true });
            result.errors.length.should.be.eq(0);
        });
    });
    describe("String", () => {
        it("should validate string uuid", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().uuid();
            let result = await validator.validate(schema, appolo_utils_1.Guid.guid());
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, appolo_utils_1.Guid.guid() + "1");
            result.errors[0].message.should.be.eq("value is not valid uuid string");
        });
        it("should validate string url", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().url();
            let result = await validator.validate(schema, "http://www.foobar.com:65535/");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "http://com/");
            result.errors[0].message.should.be.eq("value is not valid url string");
        });
        it("should validate string uppercase", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().uppercase();
            let result = await validator.validate(schema, "ABC");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "ABc");
            result.errors[0].message.should.be.eq("value is not valid upperCase string");
        });
        it("should validate string token", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().token();
            let result = await validator.validate(schema, "0skfitn-wklfot8-0ksibg-fkmnm823n7c");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "AB+c");
            result.errors[0].message.should.be.eq("value is not valid token string");
        });
        it("should validate string", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string();
            let result = await validator.validate(schema, "a");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 1);
            result.errors[0].message.should.be.eq("value is not valid string");
        });
        it("should validate string slug", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().slug();
            let result = await validator.validate(schema, "cscz");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "-not-slug");
            result.errors[0].message.should.be.eq("value is not valid slug string");
        });
        it("should validate string size", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().size(5);
            let result = await validator.validate(schema, "cscz5");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "aaa");
            result.errors[0].message.should.be.eq("value must be of size 5");
        });
        it("should validate string regex", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().regex(/^[a-z]+$/);
            let result = await validator.validate(schema, "aaaa");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "aaa5");
            result.errors[0].message.should.be.eq("value do not match regex");
        });
        it("should validate string numeric", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().numeric();
            let result = await validator.validate(schema, "-1.3");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "-1..3");
            result.errors[0].message.should.be.eq("value is not valid numeric string");
        });
        it("should validate string mongoid", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().mongoId();
            let result = await validator.validate(schema, "5e54278d75454a0017114d7b");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "5e54278d75454a0017114d7h");
            result.errors[0].message.should.be.eq("value is not valid mongo id");
        });
        it("should validate string min", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().min(5);
            let result = await validator.validate(schema, "12345");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "1234");
            result.errors[0].message.should.be.eq("value length must be at least 5");
        });
        it("should validate string md5", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().md5();
            let result = await validator.validate(schema, "d94f3f016ae679c3008de268209132f2");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "KYT0bf1c35032a71a14c2f719e5a14c1");
            result.errors[0].message.should.be.eq("value is not valid md5 string");
        });
        it("should validate string max", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().max(5);
            let result = await validator.validate(schema, "12345");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "123456");
            result.errors[0].message.should.be.eq("value length must be at most 5");
        });
        it("should validate string lowercase", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().lowercase();
            let result = await validator.validate(schema, "abc");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "ABc");
            result.errors[0].message.should.be.eq("value is not valid lowerCase string");
        });
        it("should validate string jwt", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().jwt();
            let result = await validator.validate(schema, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI");
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
            result.errors[0].message.should.be.eq("value is not valid jwt string");
        });
        it("should validate string json", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().json();
            let result = await validator.validate(schema, '{"a":1}');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, '{ key: "value" }');
            result.errors[0].message.should.be.eq("value is not valid json string");
        });
        it("should validate string iso date", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().isoDate();
            let result = await validator.validate(schema, '2009-05-19 14:39:22-06:00');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, '2009-05-19 14:39:22+06a00');
            result.errors[0].message.should.be.eq("value is not valid iso date string");
        });
        it("should validate string ip", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().ip();
            let result = await validator.validate(schema, '255.255.255.255');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, '200.0200.200.200');
            result.errors[0].message.should.be.eq("value is not valid ip string");
        });
        it("should validate string hexadecimal", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().hexadecimal();
            let result = await validator.validate(schema, '0X0123456789abcDEF');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, '0xa20x');
            result.errors[0].message.should.be.eq("value is not valid hexadecimal string");
        });
        it("should validate string hash", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().hash("sha1");
            let result = await validator.validate(schema, '3ca25ae354e192b26879f651a51d92aa8a34d8d3');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 'KYT0bf1c35032a71a14c2f719e5a14c1');
            result.errors[0].message.should.be.eq("value is not valid hash string");
        });
        it("should validate string enum", async () => {
            let validator = await index_1.validation();
            let A;
            (function (A) {
                A["B"] = "b";
                A["C"] = "c";
            })(A || (A = {}));
            let schema = index_1.string().enum(A);
            let result = await validator.validate(schema, 'b');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 'd');
            result.errors[0].message.should.be.eq("value is not valid enum");
        });
        it("should validate string email", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().email();
            let result = await validator.validate(schema, 'foo@bar.com.au');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 'foo@bar.com.');
            result.errors[0].message.should.be.eq("value is not valid email string");
        });
        it("should validate string domain", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().domain();
            let result = await validator.validate(schema, 'domain.com');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 'domain.com/');
            result.errors[0].message.should.be.eq("value is not valid domain string");
        });
        it("should validate string contains", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().contains("aa");
            let result = await validator.validate(schema, 'bbbaaaccc');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 'bbbccc');
            result.errors[0].message.should.be.eq("value dose not contain aa");
        });
        it("should validate string base64", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().base64();
            let result = await validator.validate(schema, 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4=');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, '=m9vYg==');
            result.errors[0].message.should.be.eq("value is not valid base64 string");
        });
        it("should validate string ascii", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().ascii();
            let result = await validator.validate(schema, '1234abcDEF');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 'ｶﾀｶﾅ');
            result.errors[0].message.should.be.eq("value is not valid ascii string");
        });
        it("should validate string alphanum", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().alphanum();
            let result = await validator.validate(schema, 'abc123');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 'foo!!');
            result.errors[0].message.should.be.eq("value is not valid alpha numeric string");
        });
        it("should validate string alpha", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().alpha();
            let result = await validator.validate(schema, 'abc');
            result.errors.length.should.be.eq(0);
            result = await validator.validate(schema, 'abc123');
            result.errors[0].message.should.be.eq("value is not valid alpha string");
        });
        it("should validate escape", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().decode();
            let result = await validator.validate(schema, 'http%3A%2F%2Ffoo.bar');
            result.errors.length.should.be.eq(0);
            result.value.should.be.eq("http://foo.bar");
        });
        it("should validate replace", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().replace("foo", "bar");
            let result = await validator.validate(schema, 'foobar');
            result.errors.length.should.be.eq(0);
            result.value.should.be.eq("barbar");
        });
        it("should validate replace", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().sanitize();
            let result = await validator.validate(schema, 'foo\x00');
            result.errors.length.should.be.eq(0);
            result.value.should.be.eq("foo");
        });
        it("should validate slugify", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().slugify();
            let result = await validator.validate(schema, ' foo bar ');
            result.errors.length.should.be.eq(0);
            result.value.should.be.eq("foo-bar");
        });
        it("should validate trim", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().trim();
            let result = await validator.validate(schema, ' foo bar ');
            result.errors.length.should.be.eq(0);
            result.value.should.be.eq("foo bar");
        });
        it("should validate trim", async () => {
            let validator = await index_1.validation();
            let schema = index_1.string().truncate(5);
            let result = await validator.validate(schema, 'foobar');
            result.errors.length.should.be.eq(0);
            result.value.should.be.eq("fooba...");
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