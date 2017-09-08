import {UniversityDto} from "../location/UniversityDto";
import {CityDto} from "../location/CityDto";

export interface SearchTeammateDto{
    firstName: string;
    middleName?: string;
    lastName?: string;
    description?: string;
    university?: UniversityDto;
    year?: number;
    city?: CityDto;
}