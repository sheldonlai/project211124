import {model, Schema, Document} from "mongoose";
import {Country} from "./Country";
import {BaseModel} from "../BaseModel";

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
    website: {type: String, required: true, unique: true}
});

const autoPopulateCountry = (next) => {
    this.populate("country");
    next();
};
schema.pre('findOne', autoPopulateCountry).pre('find', autoPopulateCountry);

export const UniversityModel = model<IUniversity>('university', schema);