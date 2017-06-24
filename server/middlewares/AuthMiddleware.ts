import {RepositoryProvider, ServiceProvider} from "../Container";
import {verifyToken} from "../utils/JsonWebTokenUtil";
import {User} from "../models/User";
import {AppError} from "../errors/AppError";
import {NextFunction, Request, Response} from "express";
/**
 * Created by SHELDON on 6/18/2017.
 */

export interface AuthRequest extends Request {
    user?: User;
}

export const mustBeAuthenticated = function (req: Request, res: Response, next: NextFunction) {
    try {
        let userRepository = RepositoryProvider.UserRepository;
        let payload = verifyToken(req.headers.authorization);
        userRepository.getById(payload._id).then((user: User) => {
            req.user = user;
            next();
        })
    } catch (err) {
        throw new AppError(err.message);
    }
}

export const maybeAuthenticated = function (req: Request, res: Response, next: NextFunction) {
    try {
        let userRepository = RepositoryProvider.UserRepository;
        let payload = verifyToken(req.headers.token);
        userRepository.getById(payload._id).then((user: User) => {
            req.user = user;
            next();
        })
    } catch (err) {
        next();
    }
}