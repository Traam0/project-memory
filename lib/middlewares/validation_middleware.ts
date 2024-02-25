import type { NextApiRequest, NextApiResponse } from "next";
import type { Schema } from "zod";
import { ObjectValidator } from "@/lib/utils";
import { StatusCodes } from "http-status-codes";

export default function(validator: Schema){
    return async function(Request: NextApiRequest, Response: NextApiResponse, next: any): Promise<unknown>{
        const requestBodyValidator = new ObjectValidator(validator);
        const parsedObject = requestBodyValidator.Parse(Request.body);
        if(parsedObject == null){
            return Response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                message: "UNPROCESSABLE_ENTITY",
                details: requestBodyValidator.GetErrors()
            })
        }
        Request.body = parsedObject;
        return await next();
    }
}