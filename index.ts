import "reflect-metadata";
import {createApp} from "appolo-engine"
import {Promises, Objects} from "appolo-utils";


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


import './src/types/any/constraints/requiredConstraint';

import './src/types/number/converters/numberConverter';
import './src/types/number/converters/precisionConverter';
import './src/types/number/converters/integerConverter';
import './src/types/number/constraints/integerNumberConstraint';
import './src/types/number/constraints/maxNumberConstraint';
import './src/types/number/constraints/minNumberConstraint';
import './src/types/number/constraints/multipleNumberConstraint';
import './src/types/number/constraints/negativeNumberConstraint';
import './src/types/number/constraints/numberConstraint';
import './src/types/number/constraints/portNumberConstraint';
import './src/types/number/constraints/positiveNumberConstraint';

import './src/types/object/constraints/keysConstraint';
import './src/types/object/constraints/instanceOfConstraint';
import './src/types/object/constraints/isObjectConstraint';
import './src/types/object/constraints/isObjectOrClassConstraint';
import './src/types/object/constraints/isPlainConstraint';
import './src/types/object/constraints/maxKeysConstraint';
import './src/types/object/constraints/minKeysConstraint';
import './src/types/object/constraints/sizeConstraint';
import './src/types/object/constraints/withConstraint';
import './src/types/object/constraints/withoutConstraint';
import './src/types/object/converters/jsonConverter';

import './src/types/function/constraints/maxArgsConstraint';
import './src/types/function/constraints/argsSizeConstraint';
import './src/types/function/constraints/funcConstraint';
import './src/types/function/constraints/isClassConstraint';
import './src/types/function/constraints/minArgsConstraint';

import './src/types/date/constraints/isDateConstraint';
import './src/types/date/constraints/maxConstraint';
import './src/types/date/constraints/minConstraint';
import './src/types/date/converters/dateConverter';

import './src/types/buffer/converters/toBufferConverter';
import './src/types/buffer/constraints/minConstraint';
import './src/types/buffer/constraints/maxConstraint';
import './src/types/buffer/constraints/sizeConstraint';
import './src/types/buffer/constraints/bufferConstraint';

import './src/types/boolean/constraints/booleanConstraint';
import './src/types/boolean/converters/toBooleanConverter';

import './src/types/array/converters/toSortConverter';
import './src/types/array/converters/toUniqConverter';
import './src/types/array/constraints/arrayConstraint';
import './src/types/array/constraints/containsConstraint';
import './src/types/array/constraints/hasConstraint';
import './src/types/array/constraints/itemsConstraint';
import './src/types/array/constraints/maxConstraint';
import './src/types/array/constraints/minConstraint';
import './src/types/array/constraints/sizeConstraint';
import './src/types/array/constraints/uniqConstraint';

import './src/types/any/constraints/requiredConstraint';
import './src/types/any/constraints/andConstraint';
import './src/types/any/constraints/forbiddenConstraint';
import './src/types/any/constraints/invalidConstraint';
import './src/types/any/constraints/optionalConstraint';
import './src/types/any/constraints/orConstraint';
import './src/types/any/constraints/validConstraint';
import './src/types/any/constraints/allowConstraint';
import './src/types/any/converters/defaultConverter';
import './src/types/any/converters/promiseConverter';
import './src/when/whenConstraint';

import './src/types/string/constraints/alphanumStringConstraint';
import './src/types/string/constraints/alphaStringConstraint';
import './src/types/string/constraints/asciiStringConstraint';
import './src/types/string/constraints/base64StringConstraint';
import './src/types/string/constraints/domainStringConstraint';
import './src/types/string/constraints/emailStringConstraint';
import './src/types/string/constraints/enumStringConstraint';
import './src/types/string/constraints/hashStringConstraint';
import './src/types/string/constraints/hexadecimalStringConstraint';
import './src/types/string/constraints/ipStringConstraint';
import './src/types/string/constraints/isoDateStringConstraint';
import './src/types/string/constraints/jsonStringConstraint';
import './src/types/string/constraints/jwtStringConstraint';
import './src/types/string/constraints/lowerCaseStringConstraint';
import './src/types/string/constraints/maxStringConstraint';
import './src/types/string/constraints/md5StringConstraint';
import './src/types/string/constraints/minStringConstraint';
import './src/types/string/constraints/mongoIdStringConstraint';
import './src/types/string/constraints/numericStringConstraint';
import './src/types/string/constraints/regexStringConstraint';
import './src/types/string/constraints/sizeStringConstraint';
import './src/types/string/constraints/slugStringConstraint';
import './src/types/string/constraints/stringConstraint';
import './src/types/string/constraints/tokenStringConstraint';
import './src/types/string/constraints/upperCaseStringConstraint';
import './src/types/string/constraints/urlStringConstraint';
import './src/types/string/constraints/uuidStringConstraint';
import './src/types/string/converters/decodeConverter';
import './src/types/string/converters/replaceConverter';
import './src/types/string/converters/sanitizeConverter';
import './src/types/string/converters/slugifyConverter';
import './src/types/string/converters/trimConverter';
import './src/types/string/converters/truncateConverter';
import {IConstraint} from "./src/interfaces/IConstraint";
import {IConverter} from "./src/interfaces/IConverter";
import {registerSchema} from "./src/schema/registerSchema";
import {When} from "./src/when/when";
import {IConstraintOptions} from "./src/interfaces/IConstraintOptions";
import {IConverterOptions} from "./src/interfaces/IConverterOptions";


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
    NumberSchema, StringSchema, DateSchema, BufferSchema, BooleanSchema, ObjectSchema, ArraySchema,
}


export async function validation(options: IOptions = {}): Promise<Validator> {

    let app = createApp({root: __dirname});

    app.injector.addObject("options", Objects.defaults({}, options, ValidatorDefaults));

    await app.launch();

    let server = app.injector.get<Validator>(Validator);

    return server;
}



