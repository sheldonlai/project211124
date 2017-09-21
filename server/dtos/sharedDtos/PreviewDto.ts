import {UserDto} from "../auth/UserDto";
import {CategoryTypeEnum} from "../../enums/CategoryTypeEnum";

export interface PreviewDto {
    _id: string;
    title: string;
    content: string;
    author: UserDto;
    createdUtc: Date;
    category: CategoryTypeEnum;
    tags?: any[];
    upVotes?: number;
    downVotes?: number;
    views?: number;
    updatedAt?: Date;
    img? : string;
}