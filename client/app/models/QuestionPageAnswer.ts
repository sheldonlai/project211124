import {AnswerDto} from "../../../server/dtos/q&a/AnswerDto";
import {CommentDto} from "../../../server/dtos/q&a/CommentDto";
import {QuestionDto} from "../../../server/dtos/q&a/QuestionDto";
import {UserDto} from "../../../server/dtos/auth/UserDto";
/**
 * Created by SHELDON on 6/25/2017.
 */
export class QuestionPageAnswer implements AnswerDto{
    _id: string;
    question: any;
    content: string;
    author: any;
    upVotes: number;
    downVotes: number;
    lastEditedUtc: Date;
    createdUtc: Date;
    comments: CommentDto[];

    constructor (question: QuestionDto| string, author: UserDto) {
        this.question = this.question;
        this.content = '';
        this.author = author;
        this.comments = [];
    }

}