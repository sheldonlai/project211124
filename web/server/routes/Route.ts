/**
 * Created by SHELDON on 5/11/2017.
 */
import { NextFunction, Request, Response, Router } from "express";
import {Urls} from '../../common/urls';
import * as path from 'path';



export class Route {

    constructor(router: Router) {
        router.get(Urls.Home, this.homePage);
    }

    public homePage = (req: Request, res: Response, next: NextFunction) =>{
        res.sendFile(path.resolve(__dirname, '../client/static/home.html'));
    }

    public questionPage = (req: Request, res: Response, next: NextFunction) =>{
        res.sendFile(path.resolve(__dirname, '../client/static/question.html'));
    }
}
