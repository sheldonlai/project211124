import {Document, model, Schema} from "mongoose";
import {BaseModel} from './Base/BaseModel';
import {User, UserModel, userSchema} from './User';
import {PublicityStatus} from "../enums/PublicityStatus";
import {DifficultyLevel, QuestionEducationLevel} from "../enums/QuestionEducationLevel";
import {listNumericalEnumValues} from "../utils/EnumsUtil";
import {RawDraftContentState} from "draft-js";
import {Tag, tagSchema} from "./Tags";
import {CategoryTypeEnum} from "../enums/CategoryTypeEnum";

let mongoosastic = require("mongoosastic");

export class QuestionComment {
    commentBy: User;
    commentContent: string;
    lastEditedUtc: Date;
    commentedDate: Date;

    constructor(user: User, content: string) {
        this.commentBy = user;
        this.commentContent = content;
        this.commentedDate = new Date(Date.now());
    }
}

export interface QuestionDifficulty {
    educationLevel: QuestionEducationLevel;
    difficultyLevel: DifficultyLevel;
}

export class Question extends BaseModel {
    title: string;
    content: RawDraftContentState;
    author: User;
    tags: Tag[];
    upVotes: number;
    downVotes: number;
    views: number;
    isPublished: boolean;
    lastEditedUtc: Date;
    createdUtc: Date;
    comments: QuestionComment[];
    publicityStatus: PublicityStatus;
    difficulty: QuestionDifficulty;
    category: CategoryTypeEnum;

    constructor(title: string, content: RawDraftContentState, author: User, tags: any[],
                isPublished?: boolean, publicityStatus?: PublicityStatus,
                difficulty?: QuestionDifficulty, category?: CategoryTypeEnum,) {
        super();
        this.title = title;
        this.content = content;
        this.author = author;
        this.tags = tags;
        this.category = category? category: CategoryTypeEnum.NOT_SPECIFIED;
        this.isPublished = isPublished ? isPublished : false;
        this.publicityStatus = publicityStatus ? publicityStatus : PublicityStatus.PUBLIC;
        this.difficulty = difficulty;
        this.views = 0;
    }
}


export interface IQuestion extends Question, Document {

}

const schema = new Schema({
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
    resolved: {type: Boolean, default: false, es_indexed: true},
    lastEditedUtc: {type: Date, default: Date.now, es_indexed: true},
    createdUtc: {type: Date, default: Date.now, es_indexed: true},
    publicityStatus: {
        type: String,
        enum: Object.keys(PublicityStatus),
        es_indexed: true
    },
    difficulty: {
        educationLevel: {
            type: String,
            enum: Object.keys(QuestionEducationLevel),
            default: QuestionEducationLevel.NOT_SPECIFIED,
            es_indexed: true
        },
        difficultyLevel: {
            type: Number,
            enum: listNumericalEnumValues(DifficultyLevel),
            default: DifficultyLevel.NOT_SPECIFIED,
            es_indexed: true
        }
    },
    uploads: [
        {fileUrl: String}
    ],
    comments: [{
        commentBy: {type: Schema.Types.ObjectId, ref: 'user'},
        commentContent: {type: String, required: true, es_indexed: true},
        lastEditedUtc: {type: Date, default: Date.now}
    }],
    views: {type: Number, default: 0, es_indexed: true},

});


const autoPopulateUsers = function (next) {
    this.populate(['author', "comments.commentBy", "tags"]);
    next();
};

schema.pre('findOne', autoPopulateUsers).pre('find', autoPopulateUsers);
schema.plugin(mongoosastic, {
    populate: [
        {path: 'author', select: 'username'},
        {path: 'tags', select: 'tag'},
    ]
});

export const QuestionModel = model<IQuestion>('question', schema);

