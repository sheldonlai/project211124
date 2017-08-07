import {UniversityModel} from "../models/LocationModels/Universities";
import {CountryModel} from "../models/LocationModels/Country";
import {TagModel} from "../models/Tags";
import {UserModel} from "../models/User";
import {TeammateRecordModel} from "../models/TeammateRecord";
import {QuestionModel} from "../models/Question";

let loadModels = {TagModel, CountryModel, UniversityModel, UserModel};

export const synchronizeIndex = async (isServer = false) => {

    let indexModels: any[] = [
        //QuestionModel, // question takes too long to index?
        UserModel, TeammateRecordModel
    ];
    if (isServer)
        indexModels.push(QuestionModel);

    let promises = indexModels.map((model) => {
        return new Promise((resolve, reject) => {
            model.esTruncate(function (err) {
                if (err) reject(err);

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
    });
    return Promise.all(promises);
};

