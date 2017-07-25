import {UniversityDto} from "../location/UniversityDto";
import {CityDto} from "../location/CityDto";

export interface TeammatePreviewDto{
    firstName: string;
    lastName: string;
    averageRating: number;
    university?: UniversityDto;
    description?: string;
    city?: CityDto;
}