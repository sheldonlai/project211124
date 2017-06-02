
import {ApiController} from './ApiController';
import {Routes} from '../constants/Routes';
import {APIUrls} from '../../../common/urls';
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

    fetchQuestionPreviews() : void {
        this.get(APIUrls.HomeData)
    }

}
