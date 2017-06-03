import {ApiController} from './ApiController';
import {APIUrls} from '../../../common/urls';
import {Routes} from '../constants/Routes';
import {LoginRequest} from '../../../common/dtos/auth/LoginRequest';


export class CommonController extends ApiController{

    public static _instance : CommonController = new CommonController();

    public static getInstance():CommonController {
        return CommonController._instance;
    }

    // used to navigate throughout the app
    // should be passed in by the app container
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

    login (login: LoginRequest) : Promise<any> {
        return this.post(APIUrls.Login, login);
    }

    logout () : void {
        this.removeToken();
    }

    registerUser (regRequest : any) : Promise<any> {
        return this.post(APIUrls.Register, regRequest);
    }

}
