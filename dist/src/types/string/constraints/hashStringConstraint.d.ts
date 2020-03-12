import { IConstraint, IConstraintValidateResult, ValidationParams } from "../../../interfaces/IConstraint";
import { IConstraintOptions } from "../../../interfaces/IConstraintOptions";
export declare class HashStringConstraint implements IConstraint {
    readonly Lengths: {
        md5: number;
        md4: number;
        sha1: number;
        sha256: number;
        sha384: number;
        sha512: number;
        ripemd128: number;
        ripemd160: number;
        tiger128: number;
        tiger160: number;
        tiger192: number;
        crc32: number;
        crc32b: number;
    };
    validate(params: ValidationParams): IConstraintValidateResult;
    get type(): string;
    get defaultMessage(): string;
}
declare module '../stringSchema' {
    interface StringSchema {
        hash(type: "md5" | "md4" | "sha1" | "sha256" | "sha384" | "sha512", options?: IConstraintOptions): this;
    }
}
