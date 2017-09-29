import {IQuestionRepository} from "../repositories/QuestionRepository";
import {IAnswerRepository} from "../repositories/AnswerRepository";
import {QuestionDto} from "../dtos/q&a/QuestionDto";
import {AnswerDto} from "../dtos/q&a/AnswerDto";
import {Question, QuestionComment} from "../models/Question";
import {User} from "../models/User";
import {QuestionPageDto} from "../dtos/q&a/QuestionPageDto";
import {Answer} from "../models/Answer";
import {AppError} from "../errors/AppError";
import {BaseService} from "./BaseService";
import {QuestionPreviewCollectionsDto} from "../dtos/q&a/QuestionPreviewCollectionsDto";
import {ClientError, HttpStatus} from "../errors/HttpStatus";
import {ITagRepository} from "../repositories/TagRepository";
import {ITag} from "../models/Tags";
import {UserQuestionVote} from "../models/UserQuestionVote";
import {CommentDto} from "../dtos/q&a/CommentDto"
import {IUserRepository} from "../repositories/UserRepository";
import {getQuestionsQueryByPreference} from "../elasticSearch/QuestionQueries";
import {UserPreferences} from "../models/UserPerferences";
import * as _ from "lodash";
import {blurrySearch, preciseSearch} from "../elasticSearch/QuestionQueries"
import {QuestionPreviewDto} from "../dtos/q&a/QuestionPreviewDto";
import {RecruitmentDto} from "../dtos/recruitment/RecruitmentDto";
import {Recruitment} from "../models/Recruitment";


export interface IRecruitmentService {
    createRecruitment(recruitment: RecruitmentDto, user: User): Promise<RecruitmentDto>;
}

export class RecruitmentService extends BaseService implements IRecruitmentService {
    constructor() {
        super();
    }

    createRecruitment(recruitment: RecruitmentDto, user: User): Promise<RecruitmentDto> {

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

