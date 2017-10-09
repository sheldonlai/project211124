import {ApiController} from "./ApiController";
import {AxiosPromise} from "axios";
import {APIUrls} from "../../../server/urls";
import {RecruitmentDto} from "../../../server/dtos/recruitment/RecruitmentDto";
import {RecruitmentCommentDto} from "../../../server/dtos/recruitment/RecruitmentCommenDto";
import {UserDto} from "../../../server/dtos/auth/UserDto";

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

    createRecruitment(recruitment: RecruitmentDto): AxiosPromise {
        return this.post(APIUrls.createRecruitment, recruitment);
    }

    fetchRecruitmentPage(id: string): AxiosPromise {
        return this.get(APIUrls.fetchRecruitmentPage.replace(":id", id));
    }

    addRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string): AxiosPromise {
        let reqBody = {
            comment: comment,
            recruitmentId: recruitmentId,
        };
        return this.post(APIUrls.addRecruitmentComment, reqBody);
    }

    updateRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string): AxiosPromise {
        let reqBody = {
            comment: comment,
            recruitmentId: recruitmentId,
        };
        return this.put(APIUrls.updateRecruitmentComment, reqBody);
    }

    recruitMember(member: UserDto, recruitmentId: string): AxiosPromise{
        let reqBody = {
            member: member,
            recruitmentId: recruitmentId,
        };
        return this.put(APIUrls.recruitMember, reqBody);
    }
}