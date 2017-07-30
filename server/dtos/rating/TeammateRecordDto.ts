import {University} from "../../models/LocationModels/Universities";
import {City} from "../../models/LocationModels/Cities";
import {TeammateRatingDto} from "./TeammateRatingDto";
import {AcademicInfo} from "../../models/TeammateRecord";

export interface TeammateRecordDto {
    _id: any;
    firstName: string;
    lastName: string;
    description: string;
    academicInfo?: AcademicInfo,
    city?: City;
    ratings: TeammateRatingDto[];
}