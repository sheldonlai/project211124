import {UserPreferences} from "../models/UserPerferences";

export const getQuestionsQueryByPreference = (userPreference: UserPreferences) => {

    let tagPref = userPreference.question_pref.tags_vec;
    let catPref = userPreference.question_pref.cat_vec;
    let sampleQuery: any = {
        "bool": {
            "should": [
                {
                    "range": {
                        "createdUtc": {
                            "gte": "2016",
                            "format": "yyyy"
                        }
                    }
                },
                {
                    "function_score": {
                        "query": {
                            "range": {
                                "createdUtc": {
                                    "gte": "2016",
                                    "format": "dd/MM/yyyy||yyyy"
                                }
                            }
                        },
                        "functions": [
                            {
                                "field_value_factor": {
                                    "field": "views",
                                    "factor": 0.1
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };
    for (let tag in  tagPref) {
        let score = tagPref[tag] ? (tagPref[tag] * 10) : 0;
        sampleQuery.bool.should.push({
            term: {
                "tags.tag": {
                    "value": tag,
                    "boost": score
                }
            }
        });
    }
    for (let cat in catPref) {
        let score = (catPref[cat] * 10);
        sampleQuery.bool.should.push({
            "term": {
                "category": {
                    "value": cat,
                    "boost": score
                }
            }
        })
    }
    return sampleQuery;
};

export const BlurrySearch = (InputStrings: string[]) => {
    if(InputStrings.length == 0){
        return {"match_none": {}}
    }
    let query = ({
        "bool":{
            "minimum_should_match": 1,
        }
    });

    let shouldArray: any[] = [];
    InputStrings.forEach((inputString) => {
        shouldArray.push({"fuzzy": {
            "title": {
                "value": inputString,
                "fuzziness": 2,
            }
        }});
        shouldArray.push({"term": {"content": inputString}});
        shouldArray.push({"term": {"tags": inputString}});
    });
    query.bool["should"] = shouldArray;
    console.log(JSON.stringify(query));
    return query;
};


