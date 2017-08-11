import * as mongoose from "mongoose";
import {Document, model, Schema} from "mongoose";
import {BaseModel} from './Base/BaseModel';


export class UserPreferences extends BaseModel {
    user: mongoose.Types.ObjectId;

    question_pref:  {
      tags_vec: {[name: string]: number},
      cat_vec: {[name: string]: number}
    };

    constructor() {
        super();
    }
}


export interface IUserPreferences extends UserPreferences, Document {}

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "user" , required: true, unique: true},
    question_pref:  {
      tags_vec: mongoose.SchemaTypes.Mixed,
      cat_vec: mongoose.SchemaTypes.Mixed
    },

});

export const UserPreferencesModel = model<IUserPreferences>('userPreferences', schema);
