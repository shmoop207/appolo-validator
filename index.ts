import "reflect-metadata";
import {createApp} from "appolo-engine"
import {Promises, Objects} from "appolo-utils";

import {IOptions, ISchemaOptions} from "./src/interfaces/IOptions";
import {ValidatorDefaults} from "./src/defaults/defaults";
import {Validator} from "./src/validator/validator";
import {Schema} from "./src/schema/schema";

export {Validator}

export async function validator(options: IOptions = {}): Promise<Validator> {

    let app = createApp({root: __dirname});

    app.injector.addObject("options", Objects.defaults({}, options, ValidatorDefaults));

    await app.launch();

    let server = app.injector.get<Validator>(Validator);

    return server;
}

export function schema(options?: ISchemaOptions): Schema {
    return new Schema(options)
}


//TODO custom message
//TODO required
//TODO optional
//TODO custom convert
//TODO ref
