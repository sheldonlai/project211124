import {QuestionComment} from "../../models/Question";
import {CommentDto} from "./CommentDto";
export interface AnswerDto {
    _id: string;
    question: any;
    content: string;
    author: any;
    upVotes : number;
    downVotes: number;
    lastEditedUtc : Date;
    createdUtc : Date;
    comments: CommentDto[];
}