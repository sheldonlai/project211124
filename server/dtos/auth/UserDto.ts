import {UserTypeEnum} from "../../enums/UserTypeEnum";
/**
 * Created by SHELDON on 6/24/2017.
 */
export interface UserDto {
    _id: any;
    email: string;
    username: string;
    role: UserTypeEnum;
    verified: boolean;
}