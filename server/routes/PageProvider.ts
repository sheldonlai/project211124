/**
 * Created by SHELDON on 5/11/2017.
 */
import { NextFunction, Request, Response, Router } from "express";
import * as path from 'path';
import {APIUrls} from "../urls";



export class PageProvider {

    constructor(router: Router) {
        router.get(APIUrls.MainPage + '*', this.homePage);
    }

    public homePage = (req: Request, res: Response, next: NextFunction) =>{
        res.sendFile(path.resolve(__dirname, '../../client/static/home.html'));
    };

    public questionPage = (req: Request, res: Response, next: NextFunction) =>{
        res.sendFile(path.resolve(__dirname, '../client/static/questionHome.html'));
    }
}
