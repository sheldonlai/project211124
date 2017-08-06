
import * as mongoose from "mongoose";
import {QuestionModel} from "./Question";
import {config} from "../config";
import {UniversityModel} from "./LocationModels/Universities";
import {CountryModel} from "./LocationModels/Country";
import {TagModel} from "./Tags";
import {UserModel} from "./User";

let loadModels = {TagModel, CountryModel, UniversityModel, UserModel};

export const synchronizeIndex = async (indexModels=undefined) => {
    let count = 0;
    if (indexModels === undefined){
        indexModels = [
            QuestionModel, UserModel
        ];
    }
    indexModels = indexModels.map((model) => {
        return new Promise((resolve, reject) => {
            let stream = model.synchronize();

            stream.on('data', function (err, doc) {
                count++;
            });
            stream.on('close', function () {
                console.log('indexed ' + count + ' documents!');
                resolve();
            });
            stream.on('error', function (err) {
                console.log(err);
                reject(err);
            });
        });
    })
    await Promise.all(indexModels);
};

