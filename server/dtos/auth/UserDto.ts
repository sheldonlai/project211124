import {UserTypeEnum} from "../../enums/UserTypeEnum";
import {UniversityDto} from "../location/UniversityDto";
import {CountryDto} from "../location/CountryDto";
export interface UserDto {
    _id: any;
    email: string;
    username: string;
    role: UserTypeEnum;
    verified: boolean;
    university: UniversityDto;
    company: string;
    country: CountryDto;
    points: number;
}