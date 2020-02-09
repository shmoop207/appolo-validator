import {ValidationArguments} from "../validators/IValidator";

export interface IConvertor {
    convert(validationArguments: ValidationArguments): Promise<any> | any
}
