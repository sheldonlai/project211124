import {LoginDto} from "../../../server/dtos/auth/LoginDto";
import {RegistrationDto} from "../../../server/dtos/auth/RegistrationDto";

export namespace FrontEndAuthModels {
    export class LoginRequest implements LoginDto {
        email: string;
        password: string;

        constructor(username?: string, password?: string) {
            this.email = (username) ? username : '';
            this.password = (password) ? password : '';
        }

        validate(throwError?: boolean): boolean {
            if (throwError) {
                // throw error if not valid
            }
            return true;
        }

    }

    export class RegistrationRequest implements RegistrationDto{
        email: string;
        username: string;
        password: string;

        constructor(email? : string, username? : string, password? : string){
            this.email = (email)? email : '';
            this.username = (username)? username : '';
            this.password = (password)? password : '';
        }

        checkUsernameValidity() {
            return /^[0-9a-zA-Z_]+$/.test(this.username);
        };

        checkEmailValidity() {
            return /^[0-9a-zA-Z_.-@]+$/.test(this.email);
        }
    }
}