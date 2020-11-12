import "reflect-metadata";
import {createApp} from "@appolo/engine"
import {Promises, Objects,Files} from "@appolo/utils";


import {ValidatorDefaults} from "./src/defaults/defaults";
import {Validator} from "./src/validator/validator";
import {IValidateOptions, IOptions, ISchemaOptions} from "./src/interfaces/IOptions";
import {any, AnySchema} from "./src/types/any/anySchema";
import {number} from "./src/types/number/numberSchema";
import {string} from "./src/types/string/stringSchema";
import {array} from "./src/types/array/arraySchema";
import {object} from "./src/types/object/objectSchema";
import {func} from "./src/types/function/functionSchema";
import {Ref, ref} from "./src/schema/ref";
import {when} from "./src/when/when";
import {buffer} from "./src/types/buffer/bufferSchema";
import {boolean} from "./src/types/boolean/booleanSchema";
import {or,} from "./src/types/any/constraints/orConstraint";
import {and} from "./src/types/any/constraints/andConstraint";
import {date} from "./src/types/date/dateSchema";
import {registerConstraint} from "./src/schema/registerConstraint";
import {registerConverter} from "./src/schema/registerConverter";
import {schema} from "./src/decorators/decorators";
import {NumberSchema} from "./src/types/number/numberSchema";
import {StringSchema} from "./src/types/string/stringSchema";
import {ArraySchema} from "./src/types/array/arraySchema";
import {ObjectSchema} from "./src/types/object/objectSchema";
import {BooleanSchema} from "./src/types/boolean/booleanSchema";
import {DateSchema} from "./src/types/date/dateSchema";
import {BufferSchema} from "./src/types/buffer/bufferSchema";
import {FunctionSchema} from "./src/types/function/functionSchema";
import {ValidationError} from "./src/common/errors/ValidationError";
import {ValidationErrorsError} from "./src/common/errors/ValidationErrorsError";

import {IConstraint,IConstraintValidateResult,ValidationParams} from "./src/interfaces/IConstraint";
import {IConverter} from "./src/interfaces/IConverter";
import {registerSchema} from "./src/schema/registerSchema";
import {When} from "./src/when/when";
import {IConstraintOptions} from "./src/interfaces/IConstraintOptions";
import {IConverterOptions} from "./src/interfaces/IConverterOptions";

for (let key of Files.walk(__dirname,"src/types",["js"])){
    require(key)
}

export {
    IConstraintOptions, IConverterOptions,
    registerSchema,
    registerConstraint,
    registerConverter,
    Validator,
    any,
    number,
    string,
    array,
    object,
    ref,
    when,
    or,
    schema,
    and,
    func,
    date,
    buffer,
    boolean,
    IValidateOptions,
    IOptions,
    ISchemaOptions, When,
    ValidationErrorsError, ValidationError, FunctionSchema, IConstraint, IConverter, AnySchema,
    NumberSchema, StringSchema, DateSchema, BufferSchema, BooleanSchema, ObjectSchema, ArraySchema,ValidationParams,
    IConstraintValidateResult
}

export let validate = {
    boolean,any,buffer,date,func,object,array,string,number,when,or
};

export async function validation(options: IOptions = {}): Promise<Validator> {

    let app = createApp({root: __dirname});

    app.injector.addObject("options", Objects.defaults({}, options, ValidatorDefaults));

    await app.launch();

    let server = app.injector.get<Validator>(Validator);

    return server;
}



