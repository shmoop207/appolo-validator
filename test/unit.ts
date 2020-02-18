"use strict";
import chai = require('chai');
import Q = require('bluebird');
import {schema, validator,} from "../index";
import {ValidationError} from "../src/common/errors/ValidationError";

let should = chai.should();

describe("validator", function () {


    it('should validate isNumber', async () => {
        let result: { error: ValidationError, value: any };

        let val = await validator({whitelist: true});

        let schem = schema().number();

        result = await val.validate(schem, 5);

        should.not.exist(result.error);

        result = await val.validate(schem, "5");

        result.error.constraints[0].message.should.be.eq("5 is not a number");
        result.error.constraints[0].type.should.be.eq("number")

    });

    it('should validate min number', async () => {
        let result: { error: ValidationError, value: any };

        let val = await validator({});

        let schem = schema().number().min(5);

        result = await val.validate(schem, 5);

        should.not.exist(result.error);

        result = await val.validate(schem, 3);

        result.error.constraints[0].message.should.be.eq("5 is not a number");
        result.error.constraints[0].type.should.be.eq("number")

    });

    it('should validate array', async () => {
        let result: { error: ValidationError, value: any };

        let val = await validator();

        let schem = schema().array(schema().number());

        result = await val.validate(schem, [5, "aa"]);

        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints[0].message.should.be.eq('aa is not a number');

    });

    it('should validate nested array', async () => {
        let result: { error: ValidationError, value: any };

        let val = await validator();

        let schem = schema().array(schema().array(schema().number()));

        result = await val.validate(schem, [[5], ["aa"]]);

        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints[0].message.should.be.eq('is not a valid array');
        result.error.constraints[0].constraints[0].property.should.be.eq(1);
        result.error.constraints[0].constraints[0].constraints[0].message.should.be.eq('aa is not a number');
        result.error.constraints[0].constraints[0].constraints[0].property.should.be.eq(0);

    });

    it('should validate object', async () => {
        let result: { error: ValidationError, value: any };

        let val = await validator();

        let schem = schema().object({a: schema().number(), b: schema().number()});

        result = await val.validate(schem, {a: 1, b: "11"});

        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints[0].message.should.be.eq('11 is not a number');

    });

    it('should validate nested object', async () => {
        let result: { error: ValidationError, value: any };

        let val = await validator();

        let schem = schema().object({a: schema().object({b: schema().array(schema().number())})});

        result = await val.validate(schem, {a: {b: [11, "bb"]}});

        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints[0].message.should.be.eq('is not a valid object');
        result.error.constraints[0].constraints[0].constraints[0].message.should.be.eq('is not a valid array');
        result.error.constraints[0].constraints[0].constraints[0].constraints[0].message.should.be.eq("bb is not a number");

    });

    it('should validate convert', async () => {
        let result: { error: ValidationError, value: any };

        let val = await validator();

        let schem = schema({convert: true}).object({a: schema().number(), b: schema().number()});

        result = await val.validate(schem, {a: 1, b: "11"});

        should.not.exist(result.error);
        result.value.b.should.be.eq(11);

        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints[0].message.should.be.eq('11 is not a number');

    });


    it.only('should validate with groups', async () => {
        let result: { error: ValidationError, value: any };

        let val = await validator();

        let schem = schema()
            .object({
                a: schema().number({groups: ["test"]}),
                b: schema().number({groups: ["test2"]}),
                c: schema().number()
            });

        result = await val.validate(schem, {a: 1, b: "11"}, {groups: ["test1"]});

        should.not.exist(result.error);
        result.value.b.should.be.eq("11");

        result = await val.validate(schem, {a: 1, b: "11",c:"22"}, {groups: ["test1", "test2"]});

        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(2);
        result.error.constraints[0].constraints[0].message.should.be.eq('11 is not a number');

        result = await val.validate(schem, {a: 1, b: "11"}, {});

        result.error.constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints.length.should.be.eq(1);
        result.error.constraints[0].constraints[0].message.should.be.eq('11 is not a number');

    });
});

