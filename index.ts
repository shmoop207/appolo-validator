import "reflect-metadata";
import {createApp} from "appolo-engine"
import {Promises, Objects} from "appolo-utils";

import {IOptions, ISchemaOptions} from "./src/interfaces/IOptions";
import {ValidatorDefaults} from "./src/defaults/defaults";
import {Validator} from "./src/validator/validator";
import {any} from "./src/schema/types/anySchema";
import {number} from "./src/schema/types/numberSchema";
import {string} from "./src/schema/types/stringSchema";
import {array} from "./src/schema/types/arraySchema";
import {object} from "./src/schema/types/objectSchema";
import {func} from "./src/schema/types/functionSchema";
import {ref} from "./src/schema/types/ref";
import {when} from "./src/constraints/when/when";
import {or,} from "./src/constraints/any/orConstraint";
import {and} from "./src/constraints/any/andConstraint";
import {Files} from "appolo-utils";
import {schema} from "./src/decorators/decorators";
import {DefaultConverter} from "./src/converters/any/defaultConverter";
import {KeysConstraint} from "./src/constraints/objects/keysConstraint";
import {ItemsConstraint} from "./src/constraints/arrays/itemsConstraint";
import {ForbiddenConstraint} from "./src/constraints/any/forbiddenConstraint";
import {InvalidConstraint} from "./src/constraints/any/invalidConstraint";
import {ArgsSizeConstraint} from "./src/constraints/function/argsSizeConstraint";
import {MaxArgsConstraint} from "./src/constraints/function/maxArgsConstraint";
import {IConstraintOptions} from "./src/interfaces/IConstraintOptions";


for (let file of Files.walk(__dirname, "src")) {
    require(file);
}


export {Validator, any, number, string, array, object, ref, when, or, schema,and,func}

export async function validation(options: IOptions = {}): Promise<Validator> {

    let app = createApp({root: __dirname});

    app.injector.addObject("options", Objects.defaults({}, options, ValidatorDefaults));

    await app.launch();

    let server = app.injector.get<Validator>(Validator);

    return server;
}


//TODO custom message

//TODO ValidateIf
