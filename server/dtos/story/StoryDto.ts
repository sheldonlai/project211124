import {PublicityStatus} from "../../enums/PublicityStatus";
import {QuestionComment} from "../../models/Question";
import {UserDto} from "../auth/UserDto";
import {RawDraftContentState} from "draft-js";
import {CategoryTypeEnum} from "../../enums/CategoryTypeEnum";

export interface StoryDto{
    _id : string;
    title : string;
    author: UserDto;
    content : RawDraftContentState;
    createdUtc: Date;
    isPublished : boolean;
    lastEditedUtc : Date;
    upVotes: number;
    downVotes: number;
    views: number;
    tags : any[];
    comments : QuestionComment[];
    publicityStatus:  PublicityStatus;
    category: CategoryTypeEnum;
};