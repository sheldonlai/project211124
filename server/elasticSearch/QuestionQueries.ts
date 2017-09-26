import {UserPreferences} from "../models/UserPerferences";
import {QuestionDto} from "../dtos/q&a/QuestionDto";
import {DifficultyLevel, QuestionEducationLevel} from "../enums/QuestionEducationLevel";

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

export const blurrySearch = (InputStrings: string[]) => {
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
        shouldArray.push({"match": {"content.blocks.text": inputString}});
        shouldArray.push({"match": {"tags.tag": inputString}});
    });
    query.bool["should"] = shouldArray;
    console.log(JSON.stringify(query));
    return query;
};

export const preciseSearch = (searchObject: QuestionDto) => {
    if(!searchObject.title && !searchObject.author && !searchObject.content
        && !searchObject.tags && !searchObject.category
        && searchObject.difficulty.difficultyLevel == DifficultyLevel.NOT_SPECIFIED
        && searchObject.difficulty.educationLevel == QuestionEducationLevel.NOT_SPECIFIED){
        return {"match_none": {}};
    }

    let query = ({
        "bool":{
            "minimum_should_match": "50%",
        }
    });

    let shouldArray: any[] = [];
    if(searchObject.title){
        shouldArray.push({
            "fuzzy": {
                "title": {
                    "value": searchObject.title,
                    "fuzziness": 2,
                }
            }
        });
        shouldArray.push({"match": {"title": searchObject.title}});
    }
    if(searchObject.content){
        shouldArray.push({"match":{"content.blocks.text": searchObject.content}});
    }
    if(searchObject.author){
        shouldArray.push({"match":{"author.username": searchObject.author}});
    }
    if(searchObject.tags.length > 0){
        searchObject.tags.forEach(tag => {
            shouldArray.push({"match": {"tags.tag": tag}});
        })
    }
    if(searchObject.category){
        shouldArray.push({"match": {"category": searchObject.category}});
    }
    if(searchObject.difficulty.educationLevel != QuestionEducationLevel.NOT_SPECIFIED){
        shouldArray.push({"match": {"difficulty.educationLevel": searchObject.difficulty.educationLevel}});
    }
    if(searchObject.difficulty.difficultyLevel != DifficultyLevel.NOT_SPECIFIED){
        shouldArray.push({"match": {"difficulty.difficultyLevel": searchObject.difficulty.difficultyLevel}});
    }
    query.bool["should"] = shouldArray;
    console.log(JSON.stringify(query));
    return query;
};


