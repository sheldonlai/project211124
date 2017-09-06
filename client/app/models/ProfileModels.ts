///<reference path="CommonModels.ts"/>
import {Preview} from "./CommonModels";
import {UniversityDto} from "../../../server/dtos/location/UniversityDto";
import {CountryDto} from "../../../server/dtos/location/CountryDto";

export namespace FrontEndQuestionModels {

    export interface ProfilePage {
        username: string;
        country: CountryDto;
        university: UniversityDto;
        questions: Preview[];
        stories: Preview[];
    }

}