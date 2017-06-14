
import { NextFunction, Request, Response, Router } from "express";
import {APIUrls} from "../urls";



export class HomeAPI {

    constructor(router: Router) {
        router.get(APIUrls.MainPage, this.homeData);
    }

    public homeData = (req: Request, res: Response, next: NextFunction) =>{
        res.json({'message' : 'Hello world'})
    }
}
