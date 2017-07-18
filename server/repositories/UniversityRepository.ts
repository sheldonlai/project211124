import {BaseRepository} from "./BaseRepository";
import {IUniversity, University, UniversityModel} from "../models/LocationModels/Universities";

export interface IUniversityRepository {
    getUniversitiesByCountryId(shortName: string) : Promise<any>;
}

export class UniversityRepository extends BaseRepository<University, IUniversity> implements IUniversityRepository {
    constructor() {
        super(UniversityModel);
    }

    getUniversitiesByCountryId(countryId: string): Promise<any> {
        return UniversityModel.find({country:countryId}).lean().exec();
    }

}