import {CommentDto} from "./CommentDto";
import {QuestionDto} from "./QuestionDto";
import {RawDraftContentState} from "draft-js";
export interface AnswerDto {
    _id: string;
    question: QuestionDto;
    content: RawDraftContentState;
    author: any;
    upVotes : number;
    downVotes: number;
    lastEditedUtc : Date;
    createdUtc : Date;
    comments: CommentDto[];
}