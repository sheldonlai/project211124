import {ApiController} from './ApiController';
import {APIUrls} from '../../../common/urls';
import {LoginRequest} from '../models/LoginRequest';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {AuthActionTypes} from '../actions/AuthActionTypes';
import {Routes} from '../constants/Routes';


export class CommonController extends ApiController{

    public static _instance : CommonController = new CommonController();

    public static getInstance():CommonController {
        return CommonController._instance;
    }

    // used to navigate throughout the app
    routerHistory : any;

    private constructor() {
        if(CommonController._instance){
            throw new Error("Error: Instantiation failed: Use AuthService.getInstance() instead of new.");
        }
        super();
        CommonController._instance = this;
    }

    routerLinkTo(url : Routes): void {
        this.routerHistory.push(url)
    }

    login (login: LoginRequest) : void {
        this.post(APIUrls.Login, login).then((response)=> {
            this.setToken(response.data.token);
            AppDispatcher.dispatch({
                type: AuthActionTypes.LOGGED_IN,
                data: response.data
            });
        })
    }

    logout () : void {
        this.removeToken();
    }




}
