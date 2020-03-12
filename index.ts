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
import {ValidationError} from "./src/common/errors/ValidationError.js";
import {ValidationErrorsError} from "./src/common/errors/ValidationErrorsError.js";

import {IConverterOptions} from "./src/interfaces/IConverterOptions";
import {IConstraintOptions} from "./src/interfaces/IConstraintOptions";
import './src/types/any/constraints/requiredConstraint';
import './src/types/number/converters/numberConverter';

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



