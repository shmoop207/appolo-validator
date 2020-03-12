import "reflect-metadata";
import {createApp} from "appolo-engine"
import {Promises, Objects} from "appolo-utils";

import {ValidatorDefaults} from "./src/defaults/defaults";
import {Validator} from "./src/validator/validator";
import {IValidateOptions, IOptions, ISchemaOptions} from "./src/interfaces/IOptions";
import {any} from "./src/types/any/anySchema";
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
import {Files} from "appolo-utils";
import {schema} from "./src/decorators/decorators";
import {AnySchema} from "./src/types/any/anySchema";
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

for (let file of Files.walk(__dirname, "src")) {
    require(file);
}


export {
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
    ISchemaOptions,
    AnySchema, ValidationErrorsError, ValidationError
}

export async function validation(options: IOptions = {}): Promise<Validator> {

    let app = createApp({root: __dirname});

    app.injector.addObject("options", Objects.defaults({}, options, ValidatorDefaults));

    await app.launch();

    let server = app.injector.get<Validator>(Validator);

    return server;
}



