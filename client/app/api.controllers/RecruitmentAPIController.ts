import {ApiController} from "./ApiController";
import {AxiosPromise} from "axios";
import {APIUrls} from "../../../server/urls";
import {RecruitmentDto, RecruitmentRequestDto} from "../../../server/dtos/recruitment/RecruitmentDto";
import {RecruitmentCommentDto} from "../../../server/dtos/recruitment/RecruitmentCommenDto";
import {UserDto} from "../../../server/dtos/auth/UserDto";
import {FrontEndRecruitmentModels} from "../models/RecruitmentModels";
import RecruitmentRecordEntity = FrontEndRecruitmentModels.RecruitmentRecordEntity;
import {RecruitmentRecordEntityDto} from "../../../server/dtos/recruitment/RecruitmentRecordsDto";

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

    getRecruitmentPreview(): AxiosPromise {
        return this.get(APIUrls.getRecruitmentPreviews);
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

    editRecruitment(updatedRecruitment: RecruitmentDto): AxiosPromise{
        return this.put(APIUrls.editRecruitment, updatedRecruitment);
    }

    joinRecruitment(request: RecruitmentRequestDto, recruitmentId: string): AxiosPromise{
        let reqBody = {
            request: request,
            recruitmentId: recruitmentId,
        };
        return this.put(APIUrls.joinRecruitment, reqBody);
    }

    getRecruitmentRecords(): AxiosPromise{
        return this.get(APIUrls.getRecruitmentRecords);
    }

    addRecruitmentRecord(recordEntity: RecruitmentRecordEntityDto, recordsId: string): AxiosPromise{
        let reqBody = {
            record: recordEntity,
            recordsId: recordsId,
        };
        return this.put(APIUrls.addRecruitmentRecord, reqBody);
    }

    updateRecruitmentRequest(request: RecruitmentRequestDto, recruitmentId: string, accepted: boolean){
        let reqBody = {
            request: request,
            recruitmentId: recruitmentId,
            accepted: accepted,
        };
        return this.put(APIUrls.updateRecruitmentRequest, reqBody);
    }

    updateRecruitmentRecord(recruitmentId: string, member: UserDto, accepted: boolean){
        let reqBody = {
            recruitmentId: recruitmentId,
            member: member,
            accepted: accepted,
        };
        return this.put(APIUrls.updateRecruitmentRecord, reqBody);
    }
}