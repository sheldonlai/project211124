import {NextFunction, Request, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {ILocationService} from "../services/LocationService";

export class LocationAPI extends BaseAPI {

    private service : ILocationService;

    constructor(router: Router,
                service: ILocationService) {
        super();
        this.service = service;
        router.get(APIUrls.getCountries, this.getCountries)
        router.get(APIUrls.getUniversitiesByCountry, this.getUniversitiesByCountry);

    }

    public getCountries = (req: Request, res: Response, next: NextFunction) => {
        const promise = this.service.getCountries();
        this.respondPromise(promise, res, next);
    };
    public getUniversitiesByCountry = (req: Request, res: Response, next: NextFunction) => {
        const countryId = req.params.country;
        const promise = this.service.getUniversitiesByCountryId(countryId);
        this.respondPromise(promise, res, next);
    };


}
