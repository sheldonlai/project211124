
import { NextFunction, Request, Response, Router } from "express";
import {APIUrls} from '../../common/urls';
import * as path from 'path';
import {BaseAPI} from "./BaseAPI";



export class HomeAPI extends BaseAPI {

    constructor(router: Router) {
        super();
       // router.get(APIUrls.HomeData, this.homeData);
    }

    public homeData = (req: Request, res: Response, next: NextFunction) =>{
        res.json({'message' : 'Hello world'})
    }
}
