import {UserDto} from "../auth/UserDto";
import {RawDraftContentState} from "draft-js";

export class StoryPreviewDto {
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
}