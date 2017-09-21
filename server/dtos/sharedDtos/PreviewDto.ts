import {UserDto} from "../auth/UserDto";

export interface PreviewDto {
    _id: string;
    title: string;
    content: string;
    author: UserDto;
    createdUtc: Date;
    tags?: any[];
    upVotes?: number;
    downVotes?: number;
    views?: number;
    updatedAt?: Date;
    img? : string;
}