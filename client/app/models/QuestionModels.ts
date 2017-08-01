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
        showFileUploadDialog?: boolean;
        filesUploaded?: any[];

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
            };
            this.showFileUploadDialog = false;
            this.filesUploaded = [];
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

    export class CommentModel{
        commentBy: UserDto;
        commentContent: string;
        lastEditedUtc: Date;
        commentedDate: Date;

        constructor(){
            //this.lastEditedUtc = new Date(Date.now());
            this.commentedDate = new Date(Date.now());
        }
    }

    export const cloneAnswer = (original: Answer) => {
        let clone = new Answer(original.question, original.author);
        clone = mapFieldsOnToObject(clone, original);
        clone.content = EditorState.createWithContent(clone.content.getCurrentContent());
        return clone;
    };

    export const cloneAnswers = (answers: Answer[]) => {
        return answers.length > 0 ? answers.map(ans => {
            return cloneAnswer(ans);
        }) : []
    };

    export const cloneQuestionPage = (obj: QuestionPage) => {
        let clone = new QuestionPage();
        clone.answers = cloneAnswers(obj.answers);
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