import {UserDto} from "../auth/UserDto";
import {RawDraftContentState} from "draft-js";

export class StoryPreviewDto {
    _id: string;
    title: string;
    content: RawDraftContentState;
    author: UserDto;
    tags: any[];
    upVotes: number;
    downVotes: number;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}