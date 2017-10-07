import {User} from "../models/User";
import {AppError} from "../errors/AppError";
import {BaseService} from "./BaseService";
import * as _ from "lodash";
import {RecruitmentDto} from "../dtos/recruitment/RecruitmentDto";
import {Recruitment, RecruitmentComment, recruitmentModelToDto} from "../models/Recruitment";
import {IRecruitmentRepository} from "../repositories/RecruitmentRepository";
import {DraftJsHelper} from "../utils/DraftJsHelper";
import {RecruitmentCommentDto} from "../dtos/recruitment/RecruitmentCommenDto";


export interface IRecruitmentService {
    createRecruitment(recruitment: RecruitmentDto, user: User): Promise<RecruitmentDto>;
    fetchRecruitmentPage(recruitmentId: string): Promise<RecruitmentDto>;
    addRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string, user: User): Promise<RecruitmentDto>;
    updateRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string, user: User): Promise<RecruitmentDto>;
}

export class RecruitmentService extends BaseService implements IRecruitmentService {
    constructor(
        private recruitmentRepository: IRecruitmentRepository,
    ) {
        super();
    }

    createRecruitment(recruitment: RecruitmentDto, user: User): Promise<RecruitmentDto> {
        let recruitmentObject = new Recruitment(recruitment.title, recruitment.content, recruitment.recruitStatus,
                                                user, recruitment.university, recruitment.courseDifficulty);
        return this.recruitmentRepository.create(recruitmentObject).then(recruitmentObj => {
             return recruitmentObj;
        });
    }

    fetchRecruitmentPage(recruitmentId: string): Promise<RecruitmentDto> {
        return this.recruitmentRepository.getById(recruitmentId);
    }

    addRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string, user: User): Promise<RecruitmentDto> {
        return this.recruitmentRepository.getById(recruitmentId).then(recruitment => {
            let newComment: RecruitmentComment = new RecruitmentComment(comment.request, comment.comment, user);
            recruitment.comments.push(newComment);
            return this.recruitmentRepository.update(recruitment).then(recruitment => {
                return this.recruitmentRepository.getById(recruitment._id);
            });
        })
    }

    updateRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string, user: User): Promise<RecruitmentDto> {
        console.log(recruitmentId);
        return this.recruitmentRepository.getById(recruitmentId).then(recruitment => {
            let idx: number = recruitment.comments.indexOf(comment);
            console.log('idx = ' + idx);
            return recruitment;
        })
    }

    private checkPermissionForModification = (recruitmentDto: RecruitmentDto, recruitmentObj: Recruitment, currentUser: User) => {
        if(recruitmentObj.createdBy._id.toString() != currentUser._id.toString()){
            throw new AppError("You are not the owner of this post!");
        }
        if(currentUser.username != recruitmentDto.createdBy.username){
            throw new AppError("You cannot change the username of the author");
        }
        return true;
    };

    protected applyUpdateRestrictions(recruitmentDto: RecruitmentDto, recruitmentInDB: Recruitment): RecruitmentDto {
        delete recruitmentDto._id;
        delete recruitmentDto.createdBy;
        delete recruitmentDto.createdAt;
        return recruitmentDto;
    }
}

