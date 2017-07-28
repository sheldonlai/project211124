import * as rp from "request-promise-native";
import {CoreOptions} from "request";

export class APIClient {

    headers;
    baseUrl: string;
    timeout: number; // timeout in milliseconds
    constructor(){
        this.headers = {'content-type': 'application/json'};
        this.timeout = 5000;
    }

    get options(): CoreOptions{
        return {
            json: true,
            headers: this.headers,
            timeout : this.timeout

        }
    }

    setHeader (headers) {
        this.headers = headers;
    }

    setToken(token : string) {
        this.headers['authorization'] = token;
    }

    setBaseUrl (baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    get(url: string): Promise<any>{
        return rp.get(this.baseUrl + url, this.options).catch(this.handleError);
    }

    post(url: string, data: any): Promise<any>{
        return rp.post(this.baseUrl + url, {...this.options, body: data}).catch(this.handleError);
    }

    put(url: string, data: any): Promise<any>{
        return rp.put(this.baseUrl + url, {...this.options, body: data}).catch(this.handleError);
    }

    del(url: string): Promise<any>{
        return rp.del(this.baseUrl + url, this.options).catch(this.handleError);
    }

    handleError = (error: any) => {
        console.log(error);
        throw error;
    };
}