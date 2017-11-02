
import * as elasticsearch from "elasticsearch";
export let esClient;

if (process.env.NODE_ENV !== 'production') {
    esClient = new elasticsearch.Client({host: 'localhost:9200'});
} else {
    esClient = new elasticsearch.Client({host: 'localhost:9200'});
    //for elastic cloud
    //esClient = new elasticsearch.Client({host: 'https://05b8007e6e63853169c399f184486321.us-central1.gcp.cloud.es.io:9243', httpAuth: 'WsqRfc3nHR67YL7yEWx7H59v'});
}
console.log("esClient created.");
