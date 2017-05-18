/**
 * Created by SHELDON on 5/11/2017.
 */
/**
 * Created by SHELDON on 5/11/2017.
 */
import { NextFunction, Request, Response, Router } from "express";
import {Urls} from '../../common/urls';
import * as path from 'path';



export class HomeAPI {

    constructor(router: Router) {
        router.get(Urls.HomeData, this.homeData);
    }

    public homeData = (req: Request, res: Response, next: NextFunction) =>{
        res.json({'message' : 'Hello world'})
    }
}
