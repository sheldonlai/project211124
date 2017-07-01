import {ApiController} from "./ApiController";
import {AxiosPromise, AxiosResponse} from "axios";
import {APIUrls} from "../../../server/urls";
import {QuestionDto} from "../../../server/dtos/q&a/QuestionDto";
import {convertFromRaw, convertToRaw, EditorState, RawDraftContentState} from "draft-js";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import {QuestionPreviewCollectionsDto} from "../../../server/dtos/q&a/QuestionPreviewCollectionsDto";
import {QuestionPreviewDto} from "../../../server/dtos/q&a/QuestionPreviewDto";
import Question = FrontEndQuestionModels.Question;
import QuestionPreviewCollections = FrontEndQuestionModels.QuestionPreviewCollections;
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import {QuestionPageDto} from "../../../server/dtos/q&a/QuestionPageDto";
import {AnswerDto} from "../../../server/dtos/q&a/AnswerDto";
import Answer = FrontEndQuestionModels.Answer;

export class QuestionAPIController extends ApiController {

    public static _instance: QuestionAPIController = new QuestionAPIController();

    public static getInstance(): QuestionAPIController {
        return QuestionAPIController._instance;
    }

    private constructor() {
        if (QuestionAPIController._instance) {
            throw new Error("Error: Instantiation failed: Use AuthService.getInstance() instead of new.");
        }
        super();
        QuestionAPIController._instance = this;
    }

    // Handling the conversion of the objects here
    fetchQuestionPreviews(): AxiosPromise {
        return this.get(APIUrls.QuestionPreviews).then((response: AxiosResponse) => {
            let data: QuestionPreviewCollectionsDto = response.data;
            let new_data: QuestionPreviewCollections = {myQuestions: [], featuredQuestions: []};
            if (data.featuredQuestions.length > 0) {
                new_data.featuredQuestions = data.featuredQuestions.map((preview: QuestionPreviewDto) => {
                    let new_preview = <any> preview;
                    new_preview.content = this.convertRawToText(preview.content);
                    return new_preview;
                });
            }
            if (data.myQuestions && data.myQuestions.length > 0) {
                new_data.myQuestions = data.myQuestions.map((preview: QuestionPreviewDto) => {
                    let new_preview = <any> preview;
                    new_preview.content = this.convertRawToText(preview.content);
                    return new_preview;
                });
            }
            response.data = new_data;
            return response;
        })
    }

    createQuestion(question: Question): AxiosPromise {
        const questionDto = this.convertQuestionToDto(question);
        return this.post(APIUrls.CreateQuestion, questionDto);
    }

    fetchQuestionByTitle(name: string): AxiosPromise {
        return this.get(APIUrls.GetQuestionPage.replace(":title", name))
            .then((response: AxiosResponse) => {
                let data: QuestionPageDto = response.data;
                let converted_data: QuestionPage = {question: undefined, answers:[]};
                converted_data.question = this.convertDtoToQuestion(data.question);
                converted_data.answers = (data.answers)?
                    data.answers.map(answer => this.convertDtoToAnswer(answer)) :
                    [];
                return response;
            });
    }

    private convertDtoToAnswer(questionDto: AnswerDto): Answer {
        let answer: Answer = <any>questionDto;
        answer.content = this.convertRawToEditorState(questionDto.content);
        return answer;
    }

    private convertQuestionToDto(question: Question) {
        let questionDto: QuestionDto = <any>question;
        questionDto.content = this.convertEditorStateToRaw(question.content);
        return questionDto;
    }

    private convertDtoToQuestion(questionDto: QuestionDto): Question {
        let question: Question = <any>questionDto;
        question.content = this.convertRawToEditorState(questionDto.content);
        return question;
    }

    private convertRawToEditorState(rawState: RawDraftContentState): EditorState {
        if (!rawState.entityMap) rawState.entityMap = {};
        const content = convertFromRaw(rawState);
        return EditorState.createWithContent(content);
    }

    private convertRawToText(rawState: RawDraftContentState): string {
        if (!rawState.entityMap) rawState.entityMap = {};
        const content = convertFromRaw(rawState);
        return content.getPlainText();
    }

    private convertEditorStateToRaw(editorState: EditorState): RawDraftContentState {
        let content = editorState.getCurrentContent();
        return convertToRaw(content);
    }

}
