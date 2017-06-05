import {AppError} from "./AppError";
/**
 * Created by SHELDON on 2/25/2017.
 */
export class PermissionError extends AppError{
    constructor(msg: string){
        super(msg, 403);

    }
}
