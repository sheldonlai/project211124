
import axios from 'axios';
import {LoginRequest} from '../../../common/dtos/auth/LoginRequest';
import {APIUrls} from '../../../common/urls';
import {AxiosRequestConfig} from 'axios';
import {Routes} from '../constants/Routes';
import {Config} from '../constants/configs';



export class ApiController {

    apiPrefix = '/api';

    get config(): any {
        let config = {headers: {'Content-Type': 'application/json'}};
        let token = localStorage.getItem(Config.tokenKey);
        if(token){
            config.headers['Authorization'] = 'Token ' + token;
        }
        return config;
    }

    get = (url: string) : Promise<any> => {
        return axios.get(this.apiPrefix + url, this.config);
    }

    post = (url: string, data: any) : Promise<any> => {
        return axios.post(this.apiPrefix + url, data, this.config);
    }

    put = (url: string, data: any) : Promise<any> => {
        return axios.put(this.apiPrefix + url, data, this.config);
    }

    delete = (url: string) : Promise<any> => {
        return axios.delete(this.apiPrefix + url, this.config);
    }

    getToken() : string {
        return localStorage.getItem(Config.tokenKey);
    }

    setToken (token: string) {
        localStorage.setItem(Config.tokenKey, token);
    }

    removeToken () {
        localStorage.removeItem(Config.tokenKey);
    }


}