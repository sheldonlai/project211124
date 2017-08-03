import {UniversityDto} from "../location/UniversityDto";
import {CityDto} from "../location/CityDto";
import {AcademicInfo} from "../../models/TeammateRecord";

export interface TeammatePreviewDto{
    _id: string;
    firstName: string;
    lastName: string;
    averageRating: number;
    academicInfo?: AcademicInfo;
    description?: string;
    city?: CityDto;
}