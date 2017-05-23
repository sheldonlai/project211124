/**
 * Created by SHELDON on 5/22/2017.
 */
import axios from 'axios';
import {LoginRequestDto} from '../../../common/dtos/auth/LoginRequestDto';
import {Urls} from '../../../common/urls';
import {AxiosRequestConfig} from 'axios';

export interface IApiController{
    login(user : LoginRequestDto): Promise<any>;
    getHomePageData(): Promise<any>;
}

export class ApiController implements  IApiController{

    config : any;

    public static _instance : ApiController = new ApiController();

    public static getInstance():ApiController {
        return ApiController._instance;
    }

    private constructor() {
        if(ApiController._instance){
            throw new Error("Error: Instantiation failed: Use AuthService.getInstance() instead of new.");
        }
        ApiController._instance = this;
        this.config = {headers: {'Content-Type': 'application/json'}}
    }

    setHeaderToken(token : string): void{
        this.config.headers['token'] = token;
    }

    removeHeaderToken(){
        delete this.config.headers['token'];
    }

    login(user : LoginRequestDto): Promise<any> {
        return axios.post(Urls.Login, user);
    }

    getHomePageData (): Promise<any>{
        return axios.get(Urls.HomeData);
    };
}