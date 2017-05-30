/**
 * Created by SHELDON on 5/22/2017.
 */
import axios from 'axios';
import {LoginRequestDto} from '../../../common/dtos/auth/LoginRequestDto';
import {Urls} from '../../../common/urls';
import {AxiosRequestConfig} from 'axios';

export interface IApiController{
    get (url: string) : Promise<any>;
    post (url: string, data: any) : Promise<any>;
    put (url: string, data: any) : Promise<any>;
    delete (url: string) : Promise<any>;
}

export class ApiController implements  IApiController{


    get config(): any {
        let config = {headers: {'Content-Type': 'application/json'}};
        let token = window.localStorage.getItem('token');
        if(token){
            config.headers['token'] = token;
        }
        return config;
    }

    public static _instance : ApiController = new ApiController();

    public static getInstance():ApiController {
        return ApiController._instance;
    }

    private constructor() {
        if(ApiController._instance){
            throw new Error("Error: Instantiation failed: Use AuthService.getInstance() instead of new.");
        }
        ApiController._instance = this;
    }

    get = (url: string) : Promise<any> => {
        return axios.get(url, this.config);
    }

    post = (url: string, data: any) : Promise<any> => {
        return axios.post(url, data, this.config);
    }

    put = (url: string, data: any) : Promise<any> => {
        if (data){
            return axios.put(url, data, this.config);
        }
        return axios.put(url);
    }

    delete = (url: string) : Promise<any> => {
        return axios.delete(url, this.config);
    }
}