import {University} from "../../models/LocationModels/Universities";
import {City} from "../../models/LocationModels/Cities";
import {TeammateRatingDto} from "./TeammateRatingDto";

export interface TeammateRecordDto {
    _id: any;
    firstName: string;
    lastName: string;
    description: string;
    city?: City;
    university?: University;
    year?: number;
    ratings: TeammateRatingDto[];
}