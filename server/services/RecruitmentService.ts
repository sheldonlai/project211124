import {User} from "../models/User";
import {AppError} from "../errors/AppError";
import {BaseService} from "./BaseService";
import * as _ from "lodash";
import {RecruitmentDto, RecruitmentRequestDto} from "../dtos/recruitment/RecruitmentDto";
import {Recruitment, RecruitmentComment, RecruitmentRequest} from "../models/Recruitment";
import {IRecruitmentRepository} from "../repositories/RecruitmentRepository";
import {DraftJsHelper} from "../utils/DraftJsHelper";
import {RecruitmentCommentDto} from "../dtos/recruitment/RecruitmentCommenDto";
import {UserDto} from "../dtos/auth/UserDto";
import {UserRepository} from "../repositories/UserRepository";
import {RecruitmentPreviewCollectionsDto} from "../dtos/recruitment/RecruitmentPreviewCollectionsDto";
import {RequestStateEnum} from "../enums/RecruitmentRequestEnum";


export interface IRecruitmentService {
    createRecruitment(recruitment: RecruitmentDto, user: User): Promise<RecruitmentDto>;
    fetchRecruitmentPage(recruitmentId: string, user?: User): Promise<RecruitmentDto>;
    addRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string, user: User): Promise<RecruitmentDto>;
    updateRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string, user: User): Promise<RecruitmentDto>;
    recruitMember(member: UserDto, recruitmentId: string, user: User): Promise<RecruitmentDto>;
    getRecruitmentPreviews(user?: User): Promise<RecruitmentPreviewCollectionsDto>;
    editRecruitment(recruitment: RecruitmentDto, user: User): Promise<RecruitmentDto>;
    joinRecruitment(request: RecruitmentRequestDto, recruitmentId: string, user: User): Promise<RecruitmentDto>;
    updateRecruitmentRequest(request: RecruitmentRequestDto, recruitmentId: string, user: User, accepted: boolean): Promise<RecruitmentDto>;
}

export class RecruitmentService extends BaseService implements IRecruitmentService {
    constructor(
        private recruitmentRepository: IRecruitmentRepository,
    ) {
        super();
    }

    async getRecruitmentPreviews(user?: User): Promise<RecruitmentPreviewCollectionsDto> {
        let recruitmentPreviews = [];
        recruitmentPreviews.push(this.recruitmentRepository.getAll({sort: "-createdAt", limit: 25}).catch(err =>{
            console.log(err);
        }));
        if(user){
            recruitmentPreviews.push(this.recruitmentRepository.getRecruitmentByAuthor(user));
        }
        return Promise.all(recruitmentPreviews).then(result => {
            let featuredRecruitments = result[0].map(recruitment => Recruitment.fromObject(recruitment).toPreviewDto());
            let myRecruitments = [];
            if(user){
                myRecruitments = result[1].map(recruitment => Recruitment.fromObject(recruitment).toPreviewDto());
            }

            return{
                featuredRecruitments,
                myRecruitments,
            };
        });
    }

    createRecruitment(recruitment: RecruitmentDto, user: User): Promise<RecruitmentDto> {
        let recruitmentObject = new Recruitment(recruitment.title, recruitment.content, recruitment.recruitStatus,
            user, recruitment.university, recruitment.courseDifficulty, recruitment.recruitmentYear, recruitment.recruitmentSemester);
        return this.recruitmentRepository.create(recruitmentObject).then(recruitmentObj => {
            return this.recruitmentRepository.getById(recruitmentObj._id);
        });
    }

    editRecruitment(recruitment: RecruitmentDto, user: User): Promise<RecruitmentDto> {
        return this.recruitmentRepository.getById(recruitment._id).then(recruitmentFound => {
            this.checkPermissionForModification(recruitment, recruitmentFound, user);
            recruitmentFound.title = recruitment.title;
            recruitmentFound.recruitStatus = recruitment.recruitStatus;
            recruitmentFound.recruitmentYear = recruitment.recruitmentYear;
            recruitmentFound.recruitmentSemester = recruitment.recruitmentSemester;
            recruitmentFound.university = recruitment.university;
            recruitmentFound.courseDifficulty = recruitment.courseDifficulty;
            recruitmentFound.groupMates = recruitment.groupMates;
            recruitmentFound.updatedAt = new Date();
            recruitmentFound.content = recruitment.content;
            return this.recruitmentRepository.update(recruitmentFound).then(result => {
                return this.recruitmentRepository.getById(result._id);
            })
        })
    }

    fetchRecruitmentPage(recruitmentId: string, user?: User): Promise<RecruitmentDto> {
        return this.recruitmentRepository.getById(recruitmentId).then(recruitmentFound => {
            if(user && !user._id.equals(recruitmentFound.createdBy._id)){
                recruitmentFound.pendingRequests = []; //hide private fields from non-author users
            }
            return recruitmentFound;
        });
    }

    addRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string, user: User): Promise<RecruitmentDto> {
        return this.recruitmentRepository.getById(recruitmentId).then(recruitment => {
            let newComment: RecruitmentComment = new RecruitmentComment(comment.request, comment.comment, user);
            recruitment.comments.push(newComment);
            return this.recruitmentRepository.update(recruitment).then(recruitmentObj => {
                return this.recruitmentRepository.getById(recruitmentObj._id);
            });
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
            this.checkPermissionForModificationWithRecruitmentId(recruitmentObj, user);
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

    joinRecruitment(request: RecruitmentRequestDto, recruitmentId: string, user: User): Promise<RecruitmentDto>{
        return this.recruitmentRepository.getById(recruitmentId).then(recruitmentFound => {
            let newRequest: RecruitmentRequest = new RecruitmentRequest(request.createdBy, request.message);
            recruitmentFound.pendingRequests.push(newRequest);
            return this.recruitmentRepository.update(recruitmentFound).then(updatedRecruitment => {
                return this.recruitmentRepository.getById(updatedRecruitment._id);
            })
        })
    }

    updateRecruitmentRequest(request: RecruitmentRequestDto, recruitmentId: string, user: User, accepted: boolean): Promise<RecruitmentDto>{
        return this.recruitmentRepository.getById(recruitmentId).then(recruitmentFound => {
            this.checkPermissionForModificationWithRecruitmentId(recruitmentFound, user);
            let requests: RecruitmentRequest[] = recruitmentFound.pendingRequests;
            requests.forEach(r => {
                if(r.createdBy._id.toString() == request.createdBy._id.toString()){
                    r.status = accepted? RequestStateEnum.JOINED: RequestStateEnum.DECLINED;
                }
            });
            recruitmentFound.pendingRequests = requests;
            console.log(recruitmentFound.pendingRequests[0].status);
            return this.recruitmentRepository.update(recruitmentFound).then(updatedRecruitment => {
                console.log(updatedRecruitment.pendingRequests[0].status);
                return this.recruitmentRepository.getById(updatedRecruitment._id).then(r => {
                    console.log(r.pendingRequests[0].status);
                    return r;
                });
            })
        });
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

    private checkPermissionForModificationWithRecruitmentId = (recruitmentObj: Recruitment, currentUser: User) => {
        if(recruitmentObj.createdBy._id.toString() != currentUser._id.toString()){
            throw new AppError("You are not the owner of this post!");
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

