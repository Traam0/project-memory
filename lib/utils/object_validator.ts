import { type Schema, ZodError } from "zod"
import type { ValidationError } from "@/types/globals";


export default class ObjectValidator{
    private schema: Schema;
    private errors: ValidationError;

    constructor(schema: Schema) {
        this.schema = schema
        this.errors = [];
    }


    public Parse<T>(object: object): T | null {
       try{
        this.errors = [];
        return this.schema.parse(object) as T
       }catch(error){
        if(error instanceof ZodError){
            error.issues.forEach(issue=> {
                const {message, path} = issue;
                this.errors.push({path: path.join("."), message})
            });
        }
        return null;
       }
    }

    public GetErrors():ValidationError  {
        return this.GetErrors();
    }


    public static IsValid(object: object, schema: Schema): boolean{
        return schema.safeParse(object).success;
    }

}


