import {model, Schema, Document} from "mongoose";
import {BaseModel} from "../Base/BaseModel";
import {Country} from "./Country";

export class University extends BaseModel {
    country: Country;
    name: string;
    website: string;

    constructor(country, name, website) {
        super();
        this.country = country;
        this.name = name;
        this.website = website;
    }
}

export interface IUniversity extends University, Document {
}

export const schema = new Schema({
    country: {type: Schema.Types.ObjectId, required: true, ref: "country"},
    name: {type: String, required: true, unique: true},
    website: {type: String, required: true}
});

const autoPopulateCountry = function(next){
    this.populate("country");
    next();
};
schema.pre('findOne', autoPopulateCountry).pre('find', autoPopulateCountry);

export const UniversityModel = model<IUniversity>('university', schema);