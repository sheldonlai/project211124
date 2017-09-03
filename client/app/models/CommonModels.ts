import {UserDto} from "../../../server/dtos/auth/UserDto";

export interface Preview {
    title: string;
    content: string;
    createdUtc: Date;
    author: UserDto;
    toLink : () => string;
}