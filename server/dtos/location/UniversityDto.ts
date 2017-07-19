import {CountryDto} from "./CountryDto";

export interface UniversityDto {
    _id: string;
    country: CountryDto;
    name: string;
    website: string;
}