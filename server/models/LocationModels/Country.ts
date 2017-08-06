import {model, Schema, Document} from "mongoose";
import {BaseModel} from "../Base/BaseModel";
export class Country extends BaseModel{
    name: string;
    shortName: string;
}


export interface ICountry extends Country, Document{}

export const CountrySchema = new Schema({
    name: {type: String, required: true, unique: true},
    shortName: {type: String, required: true, unique: true},
});

export const CountryModel = model<ICountry>('country', CountrySchema);