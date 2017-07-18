import {BaseService} from "./BaseService";
import {University} from "../models/LocationModels/Universities";
import {IUniversityRepository} from "../repositories/UniversityRepository";
import {Country, CountryModel} from "../models/LocationModels/Country";

export interface ILocationService {
    getCountries() : Promise<Country>;
    getUniversitiesByCountryId(countryId: string): Promise<University[]>;
}

export class LocationService extends BaseService implements ILocationService {
    constructor(private universityRepo : IUniversityRepository){
        super();
    }

    getCountries() : Promise<Country> {
        return CountryModel.find({}).lean().exec().then((country: Country)=> country);
    }

    getUniversitiesByCountryId(countryId: string): Promise<University[]> {
        return this.universityRepo.getUniversitiesByCountryId(countryId);
    }

}