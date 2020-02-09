export class ValidationError extends Error {

    constructor(private params: { target?: Object, property?: string, value: string, constraints?: { [type: string]: string; }, children?: ValidationError[] }) {

        super();

        if (!params.constraints) {
            params.constraints = {}
        }

        if (!params.children) {
            params.children = []
        }

        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    public get target(): Object {
        return this.params.target;
    }

    public get property(): string {
        return this.params.property;
    }

    public get value(): any {
        return this.params.value;
    }


    public get constraints(): { [p: string]: string } {
        return this.params.constraints;
    }


    public get children(): ValidationError[] {
        return this.params.children;
    }
}
