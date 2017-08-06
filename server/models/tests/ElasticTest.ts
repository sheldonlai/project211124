import * as mongoose from "mongoose";
import {config} from "../../config";
import {synchronizeIndex} from "../_IndexModels";
import {UserModel} from "../User";
import {elasticSearchModel} from "../../utils/ElasticSearchUtils";

let dbURI = config.database.URI;

describe("Elasticsearch test", () => {
    beforeAll(async () => {
        await mongoose.connect(dbURI);
        // await synchronizeIndex();
    });

    afterAll(async () => {
        await mongoose.disconnect()
    });

    test("search for user", async () => {
        let result = await elasticSearchModel(UserModel,
            {
                "prefix": {
                    "username": "1"
                }
            }
        );
        console.log(result);
        expect(result).toBeDefined();
    });

    test("search for user", async () => {
        let result = await elasticSearchModel(UserModel,
            {
                "prefix": {
                    "username": "1"
                }
            }
        );
        console.log(result);
        expect(result).toBeDefined();
    });
});