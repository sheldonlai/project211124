import {ApiController} from './ApiController';
import {APIUrls} from '../../../common/urls';
import {Routes} from '../constants/Routes';
import {LoginRequest} from '../models/LoginRequest';
import {AxiosPromise} from 'axios';
import {RegistrationRequest} from '../models/RegistrationRequest';


export class CommonController extends ApiController{

    public static _instance : CommonController = new CommonController();

    public static getInstance():CommonController {
        return CommonController._instance;
    }

    // used to navigate throughout the app
    // should be passed in by the app containers
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

    login (login: LoginRequest) : AxiosPromise {
        return this.post(APIUrls.Login, login);
    }

    logout () : void {
        this.removeToken();
    }

    registerUser (regRequest : RegistrationRequest) : AxiosPromise {
        return this.post(APIUrls.Register, regRequest);
    }

}
