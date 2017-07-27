import * as rp from "request-promise-native";

export class APIClient {

    headers;
    constructor(){
        this.headers = {};
    }

    setHeader (headers) {
        this.headers = headers;
    }

    get(url: string): Promise<any>{
        return rp.get(url, {json: true, headers: this.headers});
    }

    post(url: string, data: any): Promise<any>{
        return rp.post(url, {json: true, headers: this.headers, body: data});
    }

    put(url: string, data: any): Promise<any>{
        return rp.put(url, {json: true, headers: this.headers, body: data});
    }

    del(url: string): Promise<any>{
        return rp.del(url, {json: true, headers: this.headers});
    }
}