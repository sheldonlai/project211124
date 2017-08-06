
import {UniversityModel} from "../models/LocationModels/Universities";
import {CountryModel} from "../models/LocationModels/Country";
import {TagModel} from "../models/Tags";
import {UserModel} from "../models/User";
import {TeammateRecordModel} from "../models/TeammateRecord";

let loadModels = {TagModel, CountryModel, UniversityModel, UserModel};

export const synchronizeIndex = async (indexModels=undefined) => {

    if (indexModels === undefined){
        indexModels = [
            //QuestionModel, // question takes too long to index

            UserModel , TeammateRecordModel
        ];
    }
    let promises = indexModels.map((model) => {
        return new Promise((resolve, reject) => {
            let stream = model.synchronize();
            let count = 0;
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
    });
    return Promise.all(promises);
};

