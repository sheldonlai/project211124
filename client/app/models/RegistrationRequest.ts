
import {RegistrationDto} from "../../../server/dtos/auth/RegistrationDto";
export class RegistrationRequest implements RegistrationDto{
    email: string;
    name: string;
    password: string;

    constructor(email? : string, username? : string, password? : string){
        this.email = (email)? email : '';
        this.name = (username)? username : '';
        this.password = (password)? password : '';
    }
}