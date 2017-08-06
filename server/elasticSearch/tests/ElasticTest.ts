/**
 * @jest-environment node
 */

import * as mongoose from "mongoose";
import {config} from "../../config";
import {synchronizeIndex} from "../_IndexModels";
import {UserModel} from "../../models/User";
import {elasticSearchModel} from "../ElasticSearchUtils";

let dbURI = config.database.URI;

describe("Elasticsearch test", () => {
    beforeAll(async () => {
        await mongoose.connect(dbURI);
        await synchronizeIndex();
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
        // just need results to be defined, we trust that es is a robust program
    });

});