import {model, Schema, Document} from "mongoose";
import {BaseModel} from "../BaseModel";
import {Country} from "./Country";

export class StateOrProvince extends BaseModel{
    name: string;
    shortName: string;
    country: Country;
}


export interface IStateOrProvince extends StateOrProvince, Document{}

export const schema = new Schema({
    name: {type: String, required: true},                           // can have duplicates
    shortName: {type: String, required: true},                      // can have duplicates
    country: {type: Schema.Types.ObjectId, required: true},         // must have country
});
// name + country should be unique

export const StateOrProvinceModel = model<IStateOrProvince>('stateOrProvince', schema);