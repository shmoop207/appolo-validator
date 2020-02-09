import "reflect-metadata";
import {createApp} from "appolo-engine"
import {Promises, Objects} from "appolo-utils";

import {IsNumberValidator} from "./src/validators/isNumberValidator"
import {IOptions} from "./src/interfaces/IOptions";
import {ValidatorDefaults} from "./src/defaults/defaults";
import {Validator} from "./src/validator/validator";


export {Validator, IsNumberValidator}

export async function createValidator(options: IOptions = {}): Promise<Validator> {

    let app = createApp({root: __dirname});

    app.injector.addObject("options", Objects.defaults({}, options, ValidatorDefaults));

    await app.launch();

    let server = app.injector.get<Validator>(Validator);

    return server;
}
