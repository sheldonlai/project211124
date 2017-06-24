import {sign, verify} from "jsonwebtoken";
import {config} from "../config";
import {User} from "../models/User";
import {AppError} from "../errors/AppError";

export const generateToken = (payload: User) => {
    return sign(payload, config.jwt.secretKey);
}

export const verifyToken = (token: string) : User => {
    try {
        return <User> verify(token.split(" ")[1], config.jwt.secretKey);
    } catch (err){
        throw new AppError('Invalid token')
    }
}