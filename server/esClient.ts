
import * as elasticsearch from "elasticsearch";
export let esClient;

if (process.env.NODE_ENV !== 'production') {
    esClient = new elasticsearch.Client({host: 'localhost:9200'});
} else {
    esClient = new elasticsearch.Client({host: 'localhost:9200'});
}
console.log("esClient created.");