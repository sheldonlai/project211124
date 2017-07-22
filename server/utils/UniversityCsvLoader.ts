import * as fs from "fs";
import * as path from "path";
import {Country, CountryModel, ICountry} from "../models/LocationModels/Country";
import {University, UniversityModel} from "../models/LocationModels/Universities";

export const loadUniversityData = () => {
    let data = fs.readFile(path.join(__dirname, "../../data/universities.json"), (err, data)=> {
        if (err)
            console.error(err);
        let json = data.toString();
        let unis: any[] = JSON.parse(json);
        // unis = unis.filter((uni) => uni.Name.toLowerCase().indexOf("university") !== -1);
        let currentlySupported = {
            "Massachusetts Institute of Technology": true,
            "Stanford University": true,
            "Harvard University": true,
            "California Institute of Technology": true,
            "University of Chicago": true,
            "University of Toronto": true,
            "McGill University": true,
            "University of British Columbia": true,
            "University of Alberta": true,
            "University of Waterloo": true,
        };
        unis = unis.filter(function(item) {
            return currentlySupported.hasOwnProperty(item.Name);
        });
        let countries = [{name: "Canada", shortName: "CA"}, {name: "United States", shortName: "US"}];
        let promises = countries.map((country) => CountryModel.findOneAndUpdate({name: country.name},
            country, {upsert: true}).exec());

        Promise.all(promises).then((results: ICountry[]) => {
            let canada = results[0];
            let us = results[1];

            unis = unis.map(uni => new University(uni.Country === "US"? us: canada, uni.Name, uni.Website));

            return UniversityModel.remove({}).then(res => UniversityModel.insertMany(unis));
        }).then((results) => {
            if(results.length===unis.length){
                console.log("The universities have been added.");
            } else {
                throw new Error("Expected: " + unis.length + " universities to be added. But " + results.length + " was added.")
            }
        }).catch(err => console.error(err))
    });
};