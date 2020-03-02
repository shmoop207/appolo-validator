"use strict";
import chai = require('chai');
import {Promises} from 'appolo-utils';
import {array, any, object, string, number, validation, ref, when, schema, and, func} from "../index";
import {ValidationError} from "../src/common/errors/ValidationError";

let should = chai.should();

describe("validator", function () {

    describe("When", () => {
        it('should validate object when', async () => {

            let validator = await validation();

            let schema = object().keys({
                min: number(),
                max: when().fn(params => params.object.min == 5).then(number().min(5))
            });

            let result = await validator.validate(schema, {min: 5, max: 4});

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('4 min that was expected for this number');


        });

        it('should validate object when with schema', async () => {
            let validator = await validation();

            let schema = object().keys({
                min: number(),
                max: when().ref("min").schema(number().valid([5])).then(number().min(6))
            });

            let result = await validator.validate(schema, {min: 5, max: 4});

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('4 min that was expected for this number');

            let result2 = await validator.validate(schema, {min: 5, max: 7});

            result2.errors.length.should.be.eq(0);

        });

        it('should validate object when with group', async () => {
            let validator = await validation({groups: ["test"]});

            let schema = object().keys({
                min: number(),
                max: when().group("test").then(number().min(5))
            });

            let result = await validator.validate(schema, {min: 5, max: 4});

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('4 min that was expected for this number');

        });

        it('should validate object when with group else', async () => {
            let validator = await validation({groups: ["test"]});

            let schema = object().keys({
                min: number(),
                max: when().group("test2")
                    .then(number().min(5))
                    .else(number().min(7))
            });

            let result = await validator.validate(schema, {min: 5, max: 6});

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('6 min that was expected for this number');

        });

        it('should validate object when with switch', async () => {
            let validator = await validation({groups: ["test"]});

            let schema = object().keys({
                min: number(),
                max: when()
                    .case(when().group("test2").then(number().min(5)))
                    .case(when().group("test").then(number().min(6)))
                    .default(number().min(8))
            });

            let result = await validator.validate(schema, {min: 5, max: 5});

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('5 min that was expected for this number');

        });
    });


    describe("Numbers", () => {
        it('should validate isNumber', async () => {

            let validator = await validation({});

            let schema = number();

            let result = await validator.validate(schema, 5);

            result.errors.length.should.be.eq(0);

            result = await validator.validate(schema, "5");

            result.errors[0].message.should.be.eq("5 is not a number");
            result.errors[0].type.should.be.eq("number")

        });

        it('should validate min number', async () => {

            let validator = await validation({});

            let schema = number().min(5);

            let result = await validator.validate(schema, 5);

            result.errors.length.should.be.eq(0);

            result = await validator.validate(schema, 3);

            result.errors[0].message.should.be.eq("3 min that was expected for this number");
            result.errors[0].type.should.be.eq("minNumber")

        });

        it('should validate with convert numbers', async () => {
            let result: { errors: ValidationError[], value: any };

            let validator = await validation();

            let schema = object().keys({a: number(), b: number()}).options({convert: true});

            result = await validator.validate(schema, {a: 1, b: "11"});

            result.errors.length.should.be.eq(0);
            result.value.b.should.be.eq(11);

            schema = object().keys({a: number(), b: number()});

            result = await validator.validate(schema, {a: 1, b: "11"});

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('11 is not a number');

        });

        it('should validate with convert precision', async () => {
            let result: { errors: ValidationError[], value: any };

            let validator = await validation();

            let schema = object().keys({a: number(), b: number().toPrecision(2)}).options({convert: true});

            result = await validator.validate(schema, {a: 1, b: "11.6677"});

            result.errors.length.should.be.eq(0);
            result.value.b.should.be.eq(11.67);

        });


    });
    describe("Arrays", () => {
        it('should validate array', async () => {
            let validator = await validation();

            let schema = array().items(number());

            let result = await validator.validate(schema, [5, "aa"]);

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('aa is not a number');

        });

        it('should validate array or', async () => {
            let validator = await validation();

            let schema = array().items(number().or(string()));

            let result = await validator.validate(schema, [5, "aa"]);

            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal([5, "aa"]);
        });

        it('should validate array or array', async () => {
            let validator = await validation();

            let schema = array().items([number(), string()]);

            let result = await validator.validate(schema, [5, "aa"]);

            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal([5, "aa"]);
        });
        it('should validate nested array', async () => {

            let validator = await validation();

            let schema = array().items(array().items(number()));

            let result = await validator.validate(schema, [[5], ["aa"]]);

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('aa is not a number');
            result.errors[0].property.should.be.eq(0);

        });
    });

    describe("Function",()=>{
        it('should validate function isClass ', async () => {
            let validator = await validation();

            let schema = func().isClass();

            let result = await validator.validate(schema, function () {

            });
            result.errors[0].message.should.be.eq('is not a valid class');

            result = await validator.validate(schema, class A {
            });

            result.errors.length.should.be.eq(0);

        });

        it('should validate function args size', async () => {
            let validator = await validation();

            let schema = func().argsSize(3);

            let result = await validator.validate(schema, function (a,b) {

            });
            result.errors[0].message.should.be.eq('is not valid size');

            result = await validator.validate(schema, function (a,b,c) {

            });

            result.errors.length.should.be.eq(0);
        });

        it('should validate function min args size', async () => {
            let validator = await validation();

            let schema = func().minArgs(3);

            let result = await validator.validate(schema, function (a,b) {

            });
            result.errors[0].message.should.be.eq('is not valid size');

            result = await validator.validate(schema, function (a,b,c,d) {

            });

            result.errors.length.should.be.eq(0);
        });

        it('should validate function max args size', async () => {
            let validator = await validation();

            let schema = func().maxArgs(3);

            let result = await validator.validate(schema, function (a,b,c,d) {

            });
            result.errors[0].message.should.be.eq('is not valid size');

            result = await validator.validate(schema, function (a,b) {

            });

            result.errors.length.should.be.eq(0);
        });

    });


    describe("Object", () => {
        it('should validate object', async () => {
            let validator = await validation();

            let schema = object().keys({a: number(), b: number()});

            let result = await validator.validate(schema, {a: 1, b: "11"});

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq('11 is not a number');

        });

        it('should validate plain object', async () => {
            let validator = await validation();

            let schema = object().isPlain();

            let result = await validator.validate(schema, {a: 1, b: "11"});

            result.errors.length.should.be.eq(0);

            result = await validator.validate(schema, class A {
            });


            result.errors[0].message.should.be.eq('is not a valid object');

        });

        it('should validate object size', async () => {
            let validator = await validation();

            let schema = object().size(2);

            let result = await validator.validate(schema, {a: 1, b: "11"});

            result.errors.length.should.be.eq(0);

            result = await validator.validate(schema, {});


            result.errors[0].message.should.be.eq('is not valid size');

        });

        it('should validate object min', async () => {
            let validator = await validation();

            let schema = object().minKeys(2);

            let result = await validator.validate(schema, {a: 1, b: "11"});

            result.errors.length.should.be.eq(0);

            result = await validator.validate(schema, {});


            result.errors[0].message.should.be.eq('is not valid size');

        });

        it('should validate object max', async () => {
            let validator = await validation();

            let schema = object().maxKeys(2);

            let result = await validator.validate(schema, {a: 1, b: "11"});

            result.errors.length.should.be.eq(0);

            result = await validator.validate(schema, {a: 1, b: "11",c:"11"});


            result.errors[0].message.should.be.eq('is not valid size');

        });

        it('should validate object with', async () => {
            let validator = await validation();

            let schema = object().with("a",["b"]);

            let result = await validator.validate(schema, {a: 1, b: "11"});

            result.errors.length.should.be.eq(0);

            result = await validator.validate(schema, {a: 1});


            result.errors[0].message.should.be.eq('Property that should have been present at the same time as another one was missing.');

        });

        it('should validate object without', async () => {
            let validator = await validation();

            let schema = object().without("a",["b"]);

            let result = await validator.validate(schema, {a: 1});

            result.errors.length.should.be.eq(0);

            result = await validator.validate(schema, {a: 1,b:11});


            result.errors[0].message.should.be.eq('Property that should have been absent at the same time as another one was present');

        });



        it('should validate object instanceOf ', async () => {
            let validator = await validation();

            class A {

            }

            class B {

            }

            let schema = object().instanceOf(A);

            let result = await validator.validate(schema, new B());
            result.errors[0].message.should.be.eq('is not instance of');

            result = await validator.validate(schema, new A());

            result.errors.length.should.be.eq(0);

        });


        it('should validate nested object', async () => {
            let validator = await validation();

            let schema = object()
                .keys({
                    a: object()
                        .keys({
                            b: array().items(number())
                        })
                });

            let result = await validator.validate(schema, {a: {b: [11, "bb"]}});

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("bb is not a number");
            result.errors[0].parents.length.should.be.eq(2);

        });
    });


    describe("Any Schema", () => {

        it('should validate with stripUnknown', async () => {
            let result: { errors: ValidationError[], value: any };

            let validator = await validation();

            let schema = object().keys({
                a: number({}),
                b: number({}).optional(),
            });

            result = await validator.validate(schema, {a: 1, c: 1}, {});

            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal({a: 1, c: 1});

            result = await validator.validate(schema, {a: 1, c: 1}, {stripUnknown: true});

            result.value.should.be.deep.equal({a: 1});

        });


        it('should validate with allow', async () => {
            let result: { errors: ValidationError[], value: any };

            let validator = await validation();

            let schema = object().keys({
                a: number({}),
                b: number().allow([null, NaN]),
            });

            result = await validator.validate(schema, {a: 1, b: NaN}, {});

            result.errors.length.should.be.eq(0)
            result.value.should.be.deep.equal({a: 1, b: NaN});

        });

        it('should validate with required', async () => {
            let result: { errors: ValidationError[], value: any };

            let validator = await validation();

            let schema = object().keys({
                a: number({}).required(),
                b: number().required()
            });

            result = await validator.validate(schema, {a: 1});

            result.errors[0].message.should.be.eq('b is required');

        });

        it('should validate with ref', async () => {
            let result: { errors: ValidationError[], value: any };

            let validator = await validation();

            let schema = object().keys({
                a: number(),
                b: number().min(ref("a"))
            });

            result = await validator.validate(schema, {a: 4, b: 5});

            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal({a: 4, b: 5});

            result = await validator.validate(schema, {a: 4, b: 3});

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("3 min that was expected for this number");
        });


        it('should validate with and', async () => {
            let result: { errors: ValidationError[], value: any };

            let validator = await validation();

            let schema = object().keys({
                a: number(),
                b: and([number().min(3), number().max(5)])
            });

            result = await validator.validate(schema, {a: 4, b: 4});

            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal({a: 4, b: 4});

            result = await validator.validate(schema, {a: 4, b: 6});

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.eq("6 max that was expected for this number");
        });

        it('should validate with optional', async () => {
            let result: { errors: ValidationError[], value: any };

            let validator = await validation();

            let schema = object().keys({
                a: number({}),
                b: number().optional()
            });

            result = await validator.validate(schema, {a: 1});

            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal({a: 1});
        });

        it('should validate with default', async () => {
            let result: { errors: ValidationError[], value: any };

            let validator = await validation();

            let schema = object().keys({
                a: number({}),
                b: number().default(2)
            });

            result = await validator.validate(schema, {a: 1});

            result.errors.length.should.be.eq(0);
            result.value.should.be.deep.equal({a: 1, b: 2});
        });

        it('should validate with forbidden', async () => {
            let result: { errors: ValidationError[], value: any };

            let validator = await validation();

            let schema = object().keys({
                a: number({}),
                b: number().forbidden()
            });

            result = await validator.validate(schema, {a: 1, b: 2});

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.deep.equal("b is forbidden");
        });

        it('should validate with invalid', async () => {
            let result: { errors: ValidationError[], value: any };

            let validator = await validation();

            let schema = object().keys({
                a: number().invalid([1, 2, 3]),
                b: number().invalid([1, 2, 3])
            });

            result = await validator.validate(schema, {a: 4, b: 2});

            result.errors.length.should.be.eq(1);
            result.errors[0].message.should.be.deep.equal("b is not valid");
        });
    });


    describe("Decorators", () => {
        it('should validate decorators', async () => {
            @schema(object().required())
            class A {

                @number().min(5)
                private a: number
            }

            let validator = await validation();

            let result = await validator.validate(A, {a: 6});

            result.errors.length.should.be.eq(0);
        });

        it('should validate decorators with inherit', async () => {
            class C {
                @number().min(5).required()
                private c: number;

                @number().min(5).required()
                private d: number;
            }

            class B extends C {

                @number().min(5).required()
                private b: number;
            }

            class A extends B {

                @number().min(5).required()
                private a: number
            }

            let validator = await validation();

            let result = await validator.validate(A, {a: 6, d: 1});

            result.errors.length.should.be.eq(3);
            result.errors[0].message.should.be.eq("1 min that was expected for this number");
            result.errors[1].message.should.be.eq("c is required");

            result = await validator.validate(A, {a: 6, b: 6, c: 6, d: 6});

            result.errors.length.should.be.eq(0);

        })

    })


});

