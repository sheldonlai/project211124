import {CommentDto} from "../../../server/dtos/q&a/CommentDto";
import {UserDto} from "../../../server/dtos/auth/UserDto";
import {EditorState} from "draft-js";
import {PublicityStatus} from "../../../server/enums/PublicityStatus";
import {QuestionComment, QuestionDifficulty} from "../../../server/models/Question";

export namespace FrontEndQuestionModels {
    export class Question {
        _id : string;
        title : string;
        author: UserDto;
        content : EditorState;
        createdUtc?: Date;
        isPublished : boolean;
        lastEditedUtc? : Date;
        tags : any[];
        upVotes: number;
        downVotes: number;
        comments : QuestionComment[];
        publicityStatus:  PublicityStatus;
        difficulty: QuestionDifficulty;

        constructor() {

        }
    }

    export class Answer {
        _id: string;
        question: any;
        content: EditorState;
        author: any;
        upVotes: number;
        downVotes: number;
        lastEditedUtc: Date;
        createdUtc: Date;
        comments: CommentDto[];

        constructor(question: Question | string, author: UserDto) {
            this.question = this.question;
            this.content = EditorState.createEmpty();
            this.author = author;
            this.comments = [];
        }
    }

    export class QuestionPreview {
        title : string;
        content : EditorState;
        author: string;
        createdUtc: Date;
        answered: boolean;
    }

    export interface QuestionPreviewCollections {
        featuredQuestions: QuestionPreview[];
        myQuestions: QuestionPreview[];
    }

    export class QuestionPage {
        question: Question;
        answers: Answer[];
    }
}