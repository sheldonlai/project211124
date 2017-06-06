import {LoginDto} from '../../../common/dtos/auth/LoginDto';
/**
 * Created by SHELDON on 5/22/2017.
 */
export class LoginRequest implements LoginDto{
    email: string;
    password: string;

    constructor(username?: string, password?: string){
        this.email = (username)? username : '';
        this.password = (password)? password : '';
    }

    validate(throwError? : boolean) : boolean {
        if(throwError){
            // throw error if not valid
        }
        return true;
    }

}