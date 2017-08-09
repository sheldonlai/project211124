import {UniversityDto} from "../dtos/location/UniversityDto";

export const SearchByNameAndUniversityQuery = () => {

    let query = {
        "function_score": {
            "query": { "match_all": {} },
            "boost": "5",
            "functions": [
                {
                    "filter": { "match": { "test": "bar" } },
                    "random_score": {},
                    "weight": 23
                },
                {
                    "filter": { "match": { "test": "cat" } },
                    "weight": 42
                }
            ],
            "script_score" : {
                "script" : {
                    "inline": "Math.log(2 + doc['likes'].value)"
                }
            }
        }
    };
    return query;
};