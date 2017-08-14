import {EditorState} from "draft-js";
import {UserDto} from "../../../server/dtos/auth/UserDto";
import {StoryComment} from "../../../server/models/Story";
import {PublicityStatus} from "../../../server/enums/PublicityStatus";
import {CategoryTypeEnum} from "../../../server/enums/CategoryTypeEnum";

export namespace FrontEndStoryModels {

    export class Story {
        _id: string;
        title: string;
        content: EditorState;
        author: UserDto;
        tags: any[];
        upVotes: number;
        downVotes: number;
        views: number;
        isPublished: boolean;
        createdAt : Date;
        updatedAt : Date;
        comments: StoryComment[];
        publicityStatus: PublicityStatus;
        category: CategoryTypeEnum;

        constructor() {
            this.title = "";
            this.content = EditorState.createEmpty();
            this.author = undefined;
            this.tags = [];
            this.isPublished = false;
            this.publicityStatus = PublicityStatus.PUBLIC;
            this.views = 0;
            this.category = CategoryTypeEnum.NOT_SPECIFIED;
        }
    }

    export class StoryPreview {
        _id: string;
        title: string;
        content: EditorState;
        author: UserDto;
        tags: any[];
        upVotes: number;
        downVotes: number;
        views: number;
        createdAt: Date;
        updatedAt: Date;
    }

}