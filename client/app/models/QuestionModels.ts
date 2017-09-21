import {CommentDto} from "../../../server/dtos/q&a/CommentDto";
import {UserDto} from "../../../server/dtos/auth/UserDto";
import {RawDraftContentState, EditorState} from "draft-js";
import {PublicityStatus} from "../../../server/enums/PublicityStatus";
import {QuestionComment, QuestionDifficulty} from "../../../server/models/Question";
import {DifficultyLevel, QuestionEducationLevel} from "../../../server/enums/QuestionEducationLevel";
import {mapFieldsOnToObject} from "../utils/utils";
import {CategoryTypeEnum} from "../../../server/enums/CategoryTypeEnum";
import {QuestionDto} from "../../../server/dtos/q&a/QuestionDto";
import {convertRawToText} from "../utils/DraftJsUtils";
import {Routes} from "../constants/Routes";
import {Preview} from "./CommonModels";
import {QuestionPreviewDto} from "../../../server/dtos/q&a/QuestionPreviewDto";
import {FileUploadRecordDto} from "../../../server/dtos/sharedDtos/FIleUploadRecordDto";

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
        views: number;
        category: CategoryTypeEnum;
        previewImage: FileUploadRecordDto;

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
            this.category = CategoryTypeEnum.NOT_SPECIFIED;
            this.comments = [];
            this.showFileUploadDialog = false;
            this.filesUploaded = [];
            this.views = 0;
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
        correct?: boolean;

        constructor(questionId: string, author: UserDto) {
            this.question = questionId;
            this.content = EditorState.createEmpty();
            this.author = author;
            this.comments = [];
        }
    }

    export class QuestionPreview implements Preview{

        _id : string;
        title : string;
        author: UserDto;
        content : string;
        createdUtc: Date;
        isPublished : boolean;
        lastEditedUtc : Date;
        upVotes: number;
        downVotes: number;
        views: number;
        tags: any[];
        category: CategoryTypeEnum;

        constructor(dto?: QuestionDto) {
            if (!dto){
                return;
            }
            console.warn("this method is deprecated please use QuestionPreview.fromQuestionPreviewDto instead");
            this.title = dto.title;
            this._id = dto._id;
            this.content = convertRawToText(dto.content);
            this.author = dto.author;
            this.tags = dto.tags;
            this.upVotes = dto.upVotes;
            this.views = dto.views;
            this.createdUtc = dto.createdUtc;
            this.lastEditedUtc = dto.lastEditedUtc;
        }

        static fromQuestionPreviewDto(preview: QuestionPreviewDto): QuestionPreview{
            let object = new QuestionPreview();
            for ( let key of Object.keys(preview)) {
                object[key] = preview[key];
            }
            return object;
        }

        toLink() {
            let title = encodeURIComponent(this.title).replace(/%20/g, '-');
            title = encodeURIComponent(title).replace(/%3F/g, '');
            return Routes.question_by_id.replace(':id', this._id).replace(':name', title);
        }
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