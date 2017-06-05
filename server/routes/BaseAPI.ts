import {NextFunction, Request, Response, Router} from "express";

/**
 * Created by Phillip on 2017-06-04.
 */

export abstract class BaseAPI {

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