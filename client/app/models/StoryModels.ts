import {EditorState} from "draft-js";
import {UserDto} from "../../../server/dtos/auth/UserDto";
import {StoryComment} from "../../../server/models/Story";
import {PublicityStatus} from "../../../server/enums/PublicityStatus";
import {CategoryTypeEnum} from "../../../server/enums/CategoryTypeEnum";
import {Routes} from "../constants/Routes";
import {StoryDto} from "../../../server/dtos/story/StoryDto";
import {convertRawToText} from "../utils/DraftJsUtils";
import {Preview} from "./CommonModels";

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
        createdUtc : Date;
        lastEditedUtc : Date;
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

    export class StoryPreview implements Preview{
        _id: string;
        title: string;
        content: string;
        author: UserDto;
        tags: any[];
        upVotes: number;
        downVotes: number;
        views: number;
        createdUtc: Date;
        lastEditedUtc: Date;

        constructor(dto: StoryDto) {
            this.title = dto.title;
            this._id = dto._id;
            this.content = convertRawToText(dto.content);
            this.author = dto.author;
            this.tags = dto.tags;
            this.upVotes = dto.upVotes;
            this.views = dto.views;
            this.createdUtc = dto.createdUtc;
            this.lastEditedUtc = dto.lastEditedUtc;
        }

        toLink() {
            let title = encodeURIComponent(this.title).replace(/%20/g, '-');
            title = encodeURIComponent(title).replace(/%3F/g, '');
            return Routes.story_by_id.replace(':id', this._id).replace(':name', title)
        }
    }

}