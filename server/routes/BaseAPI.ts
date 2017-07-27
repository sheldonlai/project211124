import {NextFunction, Response, Router} from "express";

export abstract class BaseAPI {

    public router: Router;

    respondPromise(result: Promise<any>, res: Response, next: NextFunction) {
        result.then(function(object) {
            return res.json(object);
        }).catch(function(err) {
            return next(err);
        })
    }

    respondJson(result: any, res: Response, next: NextFunction) {
        if (result instanceof Error) {
            return next(result);
        } else {
            return res.json(result);
        }
    }

}