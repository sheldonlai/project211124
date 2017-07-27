
import { NextFunction, Request, Response, Router } from "express";
import {APIUrls} from "../urls";
import {BaseAPI} from "./BaseAPI";



export class HomeAPI extends BaseAPI{
    public router: Router;
    constructor() {
        super();
        this.router = Router();
        this.router.get(APIUrls.MainPage, this.homeData);
    }

    public homeData = (req: Request, res: Response, next: NextFunction) =>{
        res.json({'message' : 'Hello world'})
    }
}
