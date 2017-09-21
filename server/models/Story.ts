import {Document, model, Schema} from "mongoose";
import {BaseModel} from './Base/BaseModel';
import {User, userSchema} from './User';
import {PublicityStatus} from "../enums/PublicityStatus";
import {RawDraftContentState} from "draft-js";
import {Tag, tagSchema} from "./Tags";
import {CategoryTypeEnum} from "../enums/CategoryTypeEnum";
import {DraftJsHelper} from "../utils/DraftJsHelper";
import {StoryPreviewDto} from "../dtos/story/StoryPreviewDto";
import {FileUploadRecord} from "./FileUploadRecord";

let mongoosastic = require("mongoosastic");

export class StoryComment extends BaseModel {
    commentBy: User;
    commentContent: string;
    lastEditedUtc: Date;
    createdUtc: Date;

    constructor(user: User, content: string) {
        super();
        this.commentBy = user;
        this.commentContent = content;
        this.createdUtc = new Date();
    }
}

export class Story extends BaseModel {
    title: string;
    content: RawDraftContentState;
    author: User;
    tags: Tag[] | string[];
    upVotes: number;
    downVotes: number;
    views: number;
    isPublished: boolean;
    createdUtc : Date;
    lastEditedUtc : Date;
    comments: StoryComment[];
    publicityStatus: PublicityStatus;
    category: CategoryTypeEnum;
    previewImage?: FileUploadRecord;

    constructor(title?: string, content?: RawDraftContentState, author?: User, tags?: any[], isPublished?: boolean,
                publicityStatus?: PublicityStatus, category?: CategoryTypeEnum,) {
        super();
        if (title || content){
            console.warn("Using constructor is deprecated please use Story.fromObject instead.")
            this.title = title;
            this.content = content;
            this.author = author;
            this.tags = tags;
            this.isPublished = isPublished ? isPublished : false;
            this.publicityStatus = publicityStatus ? publicityStatus : PublicityStatus.PUBLIC;
            this.views = 0;
            this.category = category? category: CategoryTypeEnum.NOT_SPECIFIED;
        }
    }

    static fromObject(obj: Partial<Story>): Story {
        let object = new Story();
        for (let key of Object.keys(obj)) {
            object[key] = obj[key]
        }
        return object;
    }

    toPreviewDto(): StoryPreviewDto {
        let dto = {
            _id: this._id,
            title: this.title,
            content: DraftJsHelper.convertRawToText(this.content),
            author: this.author,
            category: this.category,
            createdUtc: this.createdUtc,
            img: this.previewImage? this.previewImage.fileURL: undefined
        };
        return dto;
    }
}


export interface IStory extends Story, Document {

}

const storySchema = new Schema({
    title: {type: String, required: true, unique: true, es_indexed: true},
    content: {type: Schema.Types.Mixed, required: true, es_indexed: true},
    author: {
        type: Schema.Types.ObjectId, ref: 'user', required: true,
        es_indexed: true, es_schema: userSchema, es_select: 'username'
    },
    category: {
        type: String, enum: Object.keys(CategoryTypeEnum),
        default: CategoryTypeEnum.NOT_SPECIFIED, es_indexed: true
    },
    tags: [
        {
            type: Schema.Types.ObjectId, ref: 'tag',
            es_indexed: true, es_schema: tagSchema, es_select: 'tag'
        }
    ],
    isPublished: {type: Boolean, default: true, es_indexed: true},
    publicityStatus: {
        type: String,
        enum: Object.keys(PublicityStatus),
        es_indexed: true
    },
    uploads: [
        {fileUrl: String}
    ],
    comments: [{
        commentBy: {type: Schema.Types.ObjectId, ref: 'user'},
        commentContent: {type: String, required: true, es_indexed: true},
        createdUtc: {type: Date, default: Date.now},
        lastEditedUtc: {type: Date, default: Date.now}
    }],
    views: {type: Number, default: 0, es_indexed: true},
    lastEditedUtc: {type: Date, default: Date.now, es_indexed: true},
    createdUtc: {type: Date, default: Date.now, es_indexed: true},
    previewImage: {type: Schema.Types.ObjectId, ref: 'fileUploadRecord'}
});


const autoPopulateUsers = function (next) {
    this.populate(['author', "comments.commentBy", "tags", "previewImage"]);
    next();
};

storySchema.pre('findOne', autoPopulateUsers).pre('find', autoPopulateUsers);
storySchema.plugin(mongoosastic, {
    populate: [
        {path: 'author', select: 'username'},
        {path: 'tags', select: 'tag'},
    ]
});

export const StoryModel = model<IStory>('story', storySchema);

