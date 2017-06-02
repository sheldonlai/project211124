/**
 * Created by SHELDON on 5/22/2017.
 */
import axios from 'axios';
import {LoginRequestDto} from '../../../common/dtos/auth/LoginRequestDto';
import {APIUrls} from '../../../common/urls';
import {AxiosRequestConfig} from 'axios';


export class ApiController {


    get config(): any {
        let config = {headers: {'Content-Type': 'application/json'}};
        let token = localStorage.getItem(Config.tokenKey);
        if(token){
            config.headers['Authorization'] = 'Token ' + token;
        }
        return config;
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