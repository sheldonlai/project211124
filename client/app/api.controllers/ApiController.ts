
import axios from 'axios';
import {AxiosPromise, AxiosError} from 'axios';
import {Config} from '../constants/configs';

/*
* Classes extending this Api Controllers should be converting Dto to Prototypes and Prototypes to Dtos
* if necessary.
* */

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

    get = (url: string) : AxiosPromise => {
        return axios.get(this.apiPrefix + url, this.config);
    };

    post = (url: string, data: any) : AxiosPromise => {
        return axios.post(this.apiPrefix + url, data, this.config);
    };

    put = (url: string, data: any) : AxiosPromise => {
        return axios.put(this.apiPrefix + url, data, this.config);
    };

    delete = (url: string) : AxiosPromise => {
        return axios.delete(this.apiPrefix + url, this.config);
    };

    getToken() : string {
        return localStorage.getItem(Config.tokenKey);
    }

    setToken (token: string) {
        localStorage.setItem(Config.tokenKey, token);
    }

    removeToken () {
        localStorage.removeItem(Config.tokenKey);
    }

    defaultErrorHandler (err: AxiosError) {
        throw new Error(err.response.data.error);
    }
}