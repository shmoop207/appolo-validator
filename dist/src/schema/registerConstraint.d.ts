import { IConstraintClass } from "../interfaces/IConstraint";
import { AnySchema } from "../types/any/anySchema";
interface IExtendParams {
    name: string;
    constraint: IConstraintClass;
    base: typeof AnySchema;
    whiteList?: boolean;
    blackList?: boolean;
}
export declare class RegisterConstraint {
    private _constraints;
    extend(params: IExtendParams): void;
    get constraints(): Map<typeof AnySchema, IExtendParams[]>;
}
export declare const registerConstraint: RegisterConstraint;
export {};
