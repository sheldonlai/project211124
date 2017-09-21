import {UserDto} from "../../../server/dtos/auth/UserDto";
import {CountryDto} from "../../../server/dtos/location/CountryDto";
import {UniversityDto} from "../../../server/dtos/location/UniversityDto";

export interface Preview {
    title: string;
    content: string;
    createdUtc: Date;
    author: UserDto;
    img? : string;
    toLink : () => string;
}


