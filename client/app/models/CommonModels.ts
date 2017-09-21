import {UserDto} from "../../../server/dtos/auth/UserDto";
import {CountryDto} from "../../../server/dtos/location/CountryDto";
import {UniversityDto} from "../../../server/dtos/location/UniversityDto";
import {CategoryTypeEnum} from "../../../server/enums/CategoryTypeEnum";

export interface Preview {
    title: string;
    content: string;
    createdUtc: Date;
    author: UserDto;
    category: CategoryTypeEnum;
    img? : string;
    toLink : () => string;
}


