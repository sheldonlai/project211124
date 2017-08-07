//
import {AppError} from "../errors/AppError";

export const elasticSearchModel = (model: any, query: any): Promise<any> => {
    if (!model.search) {
        throw new AppError("This model does not have a search function");
    }
    return new Promise((resolve, reject) => {
        model.search(query, (err, results) => {
            if (err)
                reject(err);
            resolve(results);
        })
    })
};
