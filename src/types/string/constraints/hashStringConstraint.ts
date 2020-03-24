import {IConstraint, IConstraintValidateResult, ValidationParams} from "../../../interfaces/IConstraint";
import {registerConstraint} from "../../../schema/registerConstraint";
import {IConstraintOptions} from "../../../interfaces/IConstraintOptions";
import {StringSchema} from "../stringSchema";

export class HashStringConstraint implements IConstraint {

    readonly Lengths = {
        md5: 32,
        md4: 32,
        sha1: 40,
        sha256: 64,
        sha384: 96,
        sha512: 128,
        ripemd128: 32,
        ripemd160: 40,
        tiger128: 32,
        tiger160: 40,
        tiger192: 48,
        crc32: 8,
        crc32b: 8,
    };

    public  validate(params: ValidationParams): IConstraintValidateResult {
        const value: string = params.value;

        return {isValid: typeof value == "string" && new RegExp(`^[a-fA-F0-9]{${this.Lengths[params.args[0]]}}$`).test(value)};
    }

    public get type(): string {
        return "string"
    }

    public get defaultMessage(): string {
        return "${property} is not valid hash string"
    }
}

registerConstraint.extend({
    base: StringSchema,
    name: "hash",
    constraint: HashStringConstraint
});


