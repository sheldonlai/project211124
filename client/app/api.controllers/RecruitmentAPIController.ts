import {ApiController} from "./ApiController";
import {Recruitment} from "../../../server/models/Recruitment";
import {AxiosPromise} from "axios";
import {APIUrls} from "../../../server/urls";
export class RecruitmentAPIController extends ApiController{
    public static _instance: RecruitmentAPIController = new RecruitmentAPIController();

    public static getInstance(): RecruitmentAPIController{
        return RecruitmentAPIController._instance;
    }

    private constructor(){
        super();
        if(RecruitmentAPIController._instance){
            throw new Error("Error: Instantiation failed: Use AuthService.getInstance() instead of new.");
        }
        RecruitmentAPIController._instance = this;
    }

    createRecruitment(recruitment: Recruitment): AxiosPromise {
        return this.put(APIUrls.createRecruitment, recruitment);
    }
}