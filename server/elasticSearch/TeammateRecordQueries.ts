import {UniversityDto} from "../dtos/location/UniversityDto";
import {TeammateRecordDto} from "../dtos/rating/TeammateRecordDto";

export const SearchByNameAndUniversityQuery = (firstName: string, lastName: string,
                                               university: UniversityDto, year?: number) => {

    if (!(firstName || lastName || university || year)){
        return {"match_none": {}}
    }
    let query = ({
        "bool": {
            "minimum_should_match" : 1,
        }
    });
    let shouldArray: any[] = [];

    if (firstName){
        shouldArray.push({"prefix" : { "firstName" : firstName }});
        shouldArray.push({"match": {"firstName": firstName}});
    }
    if (lastName){
        shouldArray.push({"prefix" : { "lastName" : lastName }});
        shouldArray.push({"match": {"lastName": lastName}});
    }
    if (university) {
        shouldArray.push({
            "match": {
                "university.name": {
                    "query": university.name,
                    "operator": "and"
                }
            }
        });
    }
    if (year){
        shouldArray.push({
            "range": {
                "year": {
                    "gte": year,
                    "lte": year
                }
            }
        });
    }
    if (shouldArray.length > 0)
        query.bool["should"] = shouldArray;
    console.log(JSON.stringify(query));
    return query;
};

export const PreciseSearch = (firstName: string, lastName: string, university: UniversityDto, year?: number, middleName?: string, description?: string) => {
    if(!firstName && !middleName && !lastName && !description && !university){
        return {"match_none": {}};
    }

    let query = ({
        "bool":{
            "minimum_should_match": "50%",
        }
    });

    let shouldArray: any[] = [];
    if(firstName){
        shouldArray.push({"prefix": {"firstName": firstName}});
        //mustArray.push({"match": {"firstName": firstName}});
        shouldArray.push({"fuzzy": {
            "firstName": {
                "value": firstName,
                "fuzziness": 2,
            }
        }});
    }
    if(middleName){
        shouldArray.push({"prefix": {"middleName": middleName}});
        //mustArray.push({"match": {"middleName": middleName}});
        shouldArray.push({"fuzzy": {
            "middleName": {
                "value": firstName,
                "fuzziness": 2,
            }
        }});
    }
    if(lastName){
        shouldArray.push({"prefix": {"lastName": lastName}});
        //mustArray.push({"match": {"lastName": lastName}});
        shouldArray.push({"fuzzy": {
            "lastName": {
                "value": firstName,
                "fuzziness": 2,
            }
        }});
    }
    if(description){
        shouldArray.push({"prefix": {"description": description}});
        //mustArray.push({"match": {"description": description}});
    }
    if(university){
        shouldArray.push({
            "match": {
                "university.name": {
                    "query": university.name,
                    "operator": "and"
                },
                "boost": 0.5,
            }
        })
    }
    if(year){
        shouldArray.push({
            "range":{
                "year":{
                    "gte": year,
                    "lte": year,
                },
                "boost": 0.5,
            }
        })
    }
    query.bool["should"] = shouldArray;
    console.log(JSON.stringify(query));
    return query;
};

export const BlurrySearch = (InputStrings: string[]) => {
    if(InputStrings.length == 0){
        return {"match_none": {}}
    }
    let query = ({
        "bool":{
            "minimum_should_match": Math.ceil(InputStrings.length/2),
        }
    });

    let shouldArray: any[] = [];
    InputStrings.forEach((inputString) => {
        shouldArray.push({
            "prefix": {
                "firstName": inputString,
            }
        });
        shouldArray.push({
            "prefix": {
                "middleName": inputString,
            }
        });
        shouldArray.push({
            "prefix": {
                "lastName": inputString,
            }
        });
        shouldArray.push({
            "prefix": {
                "description": inputString,
            }
        });
    });
    query.bool["should"] = shouldArray;
    console.log(JSON.stringify(query));
    return query;
};

