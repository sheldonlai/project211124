import {AppError} from "./AppError";
/**
 * Created by SHELDON on 2/21/2017.
 */

export class MissingRecordError extends AppError{
    constructor(entityName: string){
        super("Cannot find the specified " + entityName + ".");
    }
}