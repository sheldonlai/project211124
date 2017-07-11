import {ApiController} from "./ApiController";
import {AxiosPromise, AxiosResponse} from "axios";
import {APIUrls} from "../../../server/urls";
import {QuestionDto} from "../../../server/dtos/q&a/QuestionDto";
import {convertFromRaw, convertToRaw, EditorState, RawDraftContentState} from "draft-js";
import {FrontEndQuestionModels} from "../models/QuestionModels";
import {QuestionPreviewCollectionsDto} from "../../../server/dtos/q&a/QuestionPreviewCollectionsDto";
import {QuestionPreviewDto} from "../../../server/dtos/q&a/QuestionPreviewDto";
import {QuestionPageDto} from "../../../server/dtos/q&a/QuestionPageDto";
import {AnswerDto} from "../../../server/dtos/q&a/AnswerDto";
import Question = FrontEndQuestionModels.Question;
import QuestionPreviewCollections = FrontEndQuestionModels.QuestionPreviewCollections;
import QuestionPage = FrontEndQuestionModels.QuestionPage;
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
        return this.questionPostApiHelper(APIUrls.CreateQuestion, question);
    }

    updateQuestion(question: Question): AxiosPromise{
        const questionDto = this.convertQuestionToDto(question);
        return this.put(APIUrls.UpdateQuestion, questionDto).then((response: AxiosResponse) => {
            response.data = this.convertDtoToQuestion(response.data);
            return response;
        });
    }

    fetchQuestionByID(id: string): AxiosPromise {
        return this.get(APIUrls.GetQuestionPage.replace(":id", id))
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

    createAnswer(answer: Answer): AxiosPromise {
        const answerDto = this.convertAnswerToDto(answer);
        return this.post(APIUrls.CreateAnswer, answerDto).then((response: AxiosResponse) => {
            response.data = this.convertDtoToAnswer(response.data);
            return response;
        });
    }

    updateAnswer(answer: Answer): AxiosPromise {
        const answerDto = this.convertAnswerToDto(answer);
        return this.put(APIUrls.UpdateAnswer, answerDto).then((response: AxiosResponse) => {
            response.data = this.convertDtoToAnswer(response.data);
            return response;
        });
    }

    upVoteQuestion(question: Question): AxiosPromise {
        return this.questionPostApiHelper(APIUrls.upVoteQuestion, question);
    }

    downVoteQuestion(question: Question): AxiosPromise {
        return this.questionPostApiHelper(APIUrls.downVoteQuestion, question);
    }

    upVoteAnswer(answer: Answer): AxiosPromise {
        return this.answerPostApiHelper(APIUrls.UpVoteAnswer, answer);
    }

    downVoteAnswer(answer: Answer): AxiosPromise {
        return this.answerPostApiHelper(APIUrls.downVoteAnswer, answer);
    }

    private answerPostApiHelper (url: string, answer: Answer): AxiosPromise {
        const answerDto = this.convertAnswerToDto(answer);
        return this.post(url, answerDto).then((response: AxiosResponse) => {
            response.data = this.convertDtoToAnswer(response.data);
            return response;
        });
    }

    private questionPostApiHelper (url, question: Question): AxiosPromise {
        const questionDto = this.convertQuestionToDto(question);
        return this.post(url, questionDto).then((response: AxiosResponse) => {
            response.data = this.convertDtoToQuestion(response.data);
            return response;
        });
    }

    private convertDtoToAnswer(questionDto: AnswerDto): any {
        let answer: Answer = <any>questionDto;
        answer.content = this.convertRawToEditorState(questionDto.content);
        return answer;
    }

    private convertAnswerToDto(answer: Answer): AnswerDto {
        let answerDto: AnswerDto= <any>{...answer};
        answerDto.content = this.convertEditorStateToRaw(answer.content);
        return answerDto;
    }

    private convertQuestionToDto(question: Question) {
        let questionDto: QuestionDto = <any>{...question};
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
