import {University} from "../../models/LocationModels/Universities";
import {Country} from "../../models/LocationModels/Country";
import {City} from "../../models/LocationModels/Cities";

export interface TeammateRecordDto {

    firstName: string;
    lastName: string;
    description: string;
    city?: City;
    university?: University;
    year?: number;
}