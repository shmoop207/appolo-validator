import "reflect-metadata";
import {createApp} from "appolo-engine"
import {Promises, Objects} from "appolo-utils";

import {IOptions, ISchemaOptions} from "./src/interfaces/IOptions";
import {ValidatorDefaults} from "./src/defaults/defaults";
import {Validator} from "./src/validator/validator";
import {any} from "./src/types/any/anySchema";
import {number} from "./src/types/number/numberSchema";
import {string} from "./src/types/string/stringSchema";
import {array} from "./src/types/array/arraySchema";
import {object} from "./src/types/object/objectSchema";
import {func} from "./src/types/function/functionSchema";
import {ref} from "./src/schema/ref";
import {when} from "./src/when/when";
import {buffer} from "./src/types/buffer/bufferSchema";
import {boolean} from "./src/types/boolean/booleanSchema";
import {or,} from "./src/types/any/constraints/orConstraint";
import {and} from "./src/types/any/constraints/andConstraint";
import {date} from "./src/types/date/dateSchema";
import {Files} from "appolo-utils";
import {schema} from "./src/decorators/decorators";
import {DefaultConverter} from "./src/types/any/converters/defaultConverter";
import {KeysConstraint} from "./src/types/object/constraints/keysConstraint";
import {ItemsConstraint} from "./src/types/array/constraints/itemsConstraint";
import {ForbiddenConstraint} from "./src/types/any/constraints/forbiddenConstraint";
import {InvalidConstraint} from "./src/types/any/constraints/invalidConstraint";
import {ArgsSizeConstraint} from "./src/types/function/constraints/argsSizeConstraint";
import {MaxArgsConstraint} from "./src/types/function/constraints/maxArgsConstraint";
import {IConstraintOptions} from "./src/interfaces/IConstraintOptions";
import {isDateConstraint} from "./src/types/date/constraints/isDateConstraint";


for (let file of Files.walk(__dirname, "src")) {
    require(file);
}


export {Validator, any, number, string, array, object, ref, when, or, schema, and, func, date, buffer, boolean}

export async function validation(options: IOptions = {}): Promise<Validator> {

    let app = createApp({root: __dirname});

    app.injector.addObject("options", Objects.defaults({}, options, ValidatorDefaults));

    await app.launch();

    let server = app.injector.get<Validator>(Validator);

    return server;
}

//TODO custom message
// TODO istimestamp is unix is iso

