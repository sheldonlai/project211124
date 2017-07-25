import {model, Schema, Document} from "mongoose";
import {BaseModel} from "../BaseModel";

export class City extends BaseModel {
    name: string;
    stateOrProvince: any;
}

export interface ICity extends City, Document {
}

export const CountrySchema = new Schema({
    name: {type: String, required: true},
    stateOrProvince: {type: Schema.Types.ObjectId, ref: "stateOrProvince"},
    country: {type: Schema.Types.ObjectId, ref: "country", required: true},
});

export const CityModel = model<ICity>('city', CountrySchema);