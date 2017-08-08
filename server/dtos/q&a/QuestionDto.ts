import {PublicityStatus} from "../../enums/PublicityStatus";
import {QuestionComment, QuestionDifficulty} from "../../models/Question";
import {UserDto} from "../auth/UserDto";
import {RawDraftContentState} from "draft-js";
export interface QuestionDto{
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
    difficulty: QuestionDifficulty;
}