"use strict";
import chai = require('chai');
import Q = require('bluebird');
import {createValidator} from "../index";
import {ValidationError} from "../src/common/errors/ValidationError";

let should = chai.should();

describe("decorator", function () {


    it('should call throttle', async () => {
        let result:{ error: ValidationError, value: any };

        let validator = await createValidator({whitelist: true});

        result = await validator.schema().isNumber().validate(5);

        should.not.exist(result.error);

        result = await validator.schema().isNumber().validate("5");

        result.error.constraints["IsNumber"].should.be.eq("5 is not a number")

    });


});
