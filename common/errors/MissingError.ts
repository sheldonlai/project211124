import {AppError} from "./AppError";
/**
 * Created by SHELDON on 2/2/2017.
 */


export class MissingParamError extends AppError{
    constructor(msgHead: string, missing: Array<string>){
        if (missing && missing.length != null){
            let errMsg = msgHead + JSON.stringify(missing);
            super(errMsg, 400);
        } else {
            throw new Error("Your error is missing the missing parameters");
        }

    }
}
