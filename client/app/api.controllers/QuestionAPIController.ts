
import {ApiController} from './ApiController';
import {AxiosPromise} from 'axios';
import {APIUrls} from "../../../server/urls";
import {QuestionDto} from "../../../server/dtos/q&a/QuestionDto";
export class QuestionAPIController extends ApiController{

    public static _instance : QuestionAPIController = new QuestionAPIController();

    public static getInstance():QuestionAPIController {
        return QuestionAPIController._instance;
    }

    // used to navigate throughout the app
    routerHistory : any;

    private constructor() {
        if(QuestionAPIController._instance){
            throw new Error("Error: Instantiation failed: Use AuthService.getInstance() instead of new.");
        }
        super();
        QuestionAPIController._instance = this;
    }

    fetchQuestionPreviews() : AxiosPromise {
        return this.get(APIUrls.QuestionPreviews);
    }

    createQuestion(question : QuestionDto) : AxiosPromise {
        return this.post(APIUrls.CreateQuestion, question);
    }

    fetchQuestionByTitle(name: string): AxiosPromise {
        return this.get(APIUrls.GetQuestionPage.replace(":title", name) );
    }

}
