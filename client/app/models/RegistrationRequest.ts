import {RegistrationDto} from '../../../common/dtos/auth/RegistrationDto';
export class RegistrationRequest implements RegistrationDto{
    email: string;
    username: string;
    password: string;

    constructor(email? : string, username? : string, password? : string){
        this.email = (email)? email : '';
        this.username = (username)? username : '';
        this.password = (password)? password : '';
    }
}