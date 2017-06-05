import {LoginDto} from '../../../common/dtos/auth/LoginDto';
/**
 * Created by SHELDON on 5/22/2017.
 */
export class LoginRequest implements LoginDto{
    username: string;
    password: string;

    constructor(username?: string, password?: string){
        this.username = (username)? username : '';
        this.password = (password)? password : '';
    }

    validate(throwError? : boolean) : boolean {
        if(throwError){
            // throw error if not valid
        }
        return true;
    }

}