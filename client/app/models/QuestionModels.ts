import {CommentDto} from "../../../server/dtos/q&a/CommentDto";
import {UserDto} from "../../../server/dtos/auth/UserDto";
import {EditorState} from "draft-js";
import {PublicityStatus} from "../../../server/enums/PublicityStatus";
import {QuestionComment, QuestionDifficulty} from "../../../server/models/Question";
import {DifficultyLevel, QuestionEducationLevel} from "../../../server/enums/QuestionEducationLevel";
import {mapFieldsOnToObject} from "../utils/utils";

export namespace FrontEndQuestionModels {
    export class Question {
        _id: string;
        title: string;
        author: UserDto;
        content: EditorState;
        createdUtc?: Date;
        isPublished: boolean;
        lastEditedUtc?: Date;
        tags: any[];
        upVotes: number;
        downVotes: number;
        comments: QuestionComment[];
        publicityStatus: PublicityStatus;
        difficulty: QuestionDifficulty;

        constructor() {
            this.title = '';
            this.author = undefined;
            this.tags = [];
            this.isPublished = false;
            this.content = EditorState.createEmpty();
            this.publicityStatus = PublicityStatus.PUBLIC;
            this.difficulty = {
                educationLevel: QuestionEducationLevel.NOT_SPECIFIED,
                difficultyLevel: DifficultyLevel.NOT_SPECIFIED
            }
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

        constructor(questionId: string, author: UserDto) {
            this.question = questionId;
            this.content = EditorState.createEmpty();
            this.author = author;
            this.comments = [];
        }
    }

    export class QuestionPreview {
        _id: any;
        title: string;
        content: string;
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

        constructor() {
            this.answers = [];
        }
    }

    export const cloneQuestionPage = (obj: QuestionPage) => {
        let clone = new QuestionPage();
        clone.answers = obj.answers.length > 0 ? obj.answers.map(ans => {
            ans.content = EditorState.createWithContent(ans.content.getCurrentContent());
            return ans;
        }) : [];
        clone.question = cloneQuestion(obj.question);
        return clone;
    };

    export const cloneQuestion = (original: Question): Question => {
        let clone = new Question();
        clone = mapFieldsOnToObject(clone, original);
        clone.title = original.title;
        clone.content = EditorState.createWithContent(clone.content.getCurrentContent());
        return clone;
    }
}