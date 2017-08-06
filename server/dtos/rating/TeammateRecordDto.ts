import {University} from "../../models/LocationModels/Universities";
import {City} from "../../models/LocationModels/Cities";
import {TeammateRatingDto} from "./TeammateRatingDto";
import {AcademicInfo} from "../../models/TeammateRecord";
import {UniversityYearEnum} from "../../enums/UniversityYearEnum";
import {UniversityDto} from "../location/UniversityDto";

export interface AcademicInfoDto {
    university: UniversityDto; // university id
    year: UniversityYearEnum
}

export interface TeammateRecordDto {
    _id: string;
    firstName: string;
    lastName: string;
    description: string;
    university?: UniversityDto; // university id
    year?: UniversityYearEnum;
    city?: City;
    ratings: TeammateRatingDto[];
}