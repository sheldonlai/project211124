import {ApiController} from "./ApiController";
import {AxiosPromise} from "axios";
import {APIUrls} from "../../../server/urls";
import {TeammateRatingDto} from "../../../server/dtos/rating/TeammateRatingDto";
import {TeammateRecordDto} from "../../../server/dtos/rating/TeammateRecordDto";

export class RatingApiController extends ApiController{
    public static _instance : RatingApiController = new RatingApiController();

    public static getInstance():RatingApiController {
        return RatingApiController._instance;
    }

    private constructor(){
        if (RatingApiController._instance) {
            throw new Error("Error: Instantiation failed: Use AuthService.getInstance() instead of new.");
        }
        super();
        RatingApiController._instance = this;
    }

    public createTeammateRecord(teammateRecordDto: TeammateRecordDto): AxiosPromise{
        return this.post(APIUrls.createTeammateRecord, teammateRecordDto);
    }

    public getTeammateRecordPreview(): AxiosPromise{
        return this.get(APIUrls.getTeammateRecordPreview);
    }

    public getTeammateRecord(teammateRecordId: string): AxiosPromise{
        return this.get(APIUrls.getTeammateRecord.replace(":id", teammateRecordId));
    }

    public addRating(teammateRatingDto: TeammateRatingDto, teammateRecordId: string): AxiosPromise{
        return this.post(APIUrls.addRating.replace(":id", teammateRecordId), teammateRatingDto);
    }

    public updateRating(teammateRatingDto: TeammateRatingDto, teammateRecordId: string): AxiosPromise{
        return this.put(APIUrls.editRating.replace(":id", teammateRecordId), teammateRatingDto);
    }

    public searchForTeammate(teammateRecordDto: TeammateRecordDto): AxiosPromise{
        return this.post(APIUrls.searchForTeammate, teammateRecordDto);
    }

}