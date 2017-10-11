import {User} from "../models/User";
import {AppError} from "../errors/AppError";
import {BaseService} from "./BaseService";
import * as _ from "lodash";
import {RecruitmentDto} from "../dtos/recruitment/RecruitmentDto";
import {Recruitment, RecruitmentComment, recruitmentModelToDto} from "../models/Recruitment";
import {IRecruitmentRepository} from "../repositories/RecruitmentRepository";
import {DraftJsHelper} from "../utils/DraftJsHelper";
import {RecruitmentCommentDto} from "../dtos/recruitment/RecruitmentCommenDto";
import {UserDto} from "../dtos/auth/UserDto";
import {UserRepository} from "../repositories/UserRepository";
import {RecruitmentPreviewCollectionsDto} from "../dtos/recruitment/RecruitmentPreviewCollectionsDto";


export interface IRecruitmentService {
    createRecruitment(recruitment: RecruitmentDto, user: User): Promise<RecruitmentDto>;
    fetchRecruitmentPage(recruitmentId: string): Promise<RecruitmentDto>;
    addRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string, user: User): Promise<RecruitmentDto>;
    updateRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string, user: User): Promise<RecruitmentDto>;
    recruitMember(member: UserDto, recruitmentId: string, user: User): Promise<RecruitmentDto>;
    getRecruitmentPreviews(user?: User): Promise<RecruitmentPreviewCollectionsDto>;
}

export class RecruitmentService extends BaseService implements IRecruitmentService {
    constructor(
        private recruitmentRepository: IRecruitmentRepository,
    ) {
        super();
    }

    async getRecruitmentPreviews(user?: User): Promise<RecruitmentPreviewCollectionsDto> {
        let recruitmentPreviews = [];
        recruitmentPreviews.push(this.recruitmentRepository.getAll({sort: "-createdAt", limit: 25}));
        if(user){
            recruitmentPreviews.push(this.recruitmentRepository.getRecruitmentByAuthor(user));
        }
        return Promise.all(recruitmentPreviews).then(result => {
            let featuredRecruitments = result[0].map(recruitment => Recruitment.fromObject(recruitment).toPreviewDto());
            let myRecruitments = [];
            if(user){
                result[1].map(recruitment => Recruitment.fromObject(recruitment).toPreviewDto());
            }

            return{
                featuredRecruitments,
                myRecruitments,
            };
        })
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
            return this.recruitmentRepository.update(recruitment);
        })
    }

    updateRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string, user: User): Promise<RecruitmentDto> {
        return this.recruitmentRepository.getById(recruitmentId).then(recruitment => {
            let idx: number = -1;
            recruitment.comments.forEach((T, indx) => {
                if(T._id == comment._id) {
                    idx = indx;
                    return;
                }
            });
            recruitment.comments[idx] = comment;
            return this.recruitmentRepository.update(recruitment).then(recruitment => {
                return this.recruitmentRepository.getById(recruitment._id);
            });
        });
    }

    recruitMember(member: UserDto, recruitmentId: string, user: User): Promise<RecruitmentDto>{
        return this.recruitmentRepository.getById(recruitmentId).then(recruitmentObj => {
            if(recruitmentObj.groupMates.indexOf(member) != -1){
                console.error("Member already exist in group");
                return recruitmentObj;
            }
            recruitmentObj.groupMates.push(member);
            return this.recruitmentRepository.update(recruitmentObj).then(recruitment => {
                return this.recruitmentRepository.getById(recruitment._id).then(recruitment => {
                    return recruitment;
                });
            });
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

