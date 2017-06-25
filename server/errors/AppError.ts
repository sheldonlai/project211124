

import {HttpStatus, ServerError} from "./HttpStatus";
export class AppError extends Error{

    status : HttpStatus;
    //name: ExceptionName; let me think
    //rci: RCI;
    message: string;

    constructor(message: string, status?: HttpStatus){
        super(message);
        this.name = 'AppError'; // this needs to be changed
        this.status = (status)? status : ServerError.INTERNAL_SERVER_ERROR;
    }

}
