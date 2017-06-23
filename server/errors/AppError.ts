
export class AppError extends Error{

    status : number;

    constructor(message : string, code? : number){
        super(message);
        this.name = 'AppError';
        this.status = (code)? code : 400;
    }

}
