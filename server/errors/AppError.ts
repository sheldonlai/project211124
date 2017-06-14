
export class AppError extends Error{

    status : number;

    constructor(message : string, code? : number){
        super(message);
        this.status = (code)? code : 400;
    }

}
