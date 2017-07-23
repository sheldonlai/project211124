import {UniversityDto} from "../location/UniversityDto";
import {CityDto} from "../location/CityDto";

export interface SearchTeammateDto{
    firstName: string;
    lastName?: string;
    university?: UniversityDto;
    city?: CityDto;
}