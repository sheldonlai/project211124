import {sign, verify} from "jsonwebtoken";
import {config} from "../config";
import {User} from "../models/User";

export const generateToken = (payload: User) => {
    return sign(payload, config.jwt.secretKey);
}

export const verifyToken = (token: string) : User => {
    return <User> verify(token, config.jwt.secretKey);
}