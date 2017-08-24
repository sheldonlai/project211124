import {UniversityDto} from "../dtos/location/UniversityDto";

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

export const BlurrySearch = (InputStrings: string[]) => {
    if(InputStrings.length == 0){
        return {"match_none": {}}
    }

    let query = ({
        "bool":{
            "minimum_should_match": InputStrings.length / 2,
        }
    });

    let shouldArray: any[] = [];
    InputStrings.forEach((inputString) => {
        shouldArray.push({
            "match": {
                "firstName": inputString,
                "operator": "or",
            }
        });
        shouldArray.push({
            "match": {
                "middleName": inputString,
                "operator": "or",
            }
        });
        shouldArray.push({
            "match": {
                "lastName": inputString,
                "operator": "or",
            }
        });
        shouldArray.push({
            "match": {
                "description": inputString,
                "operator": "or",
            }
        });
    });
    query.bool["should"] = shouldArray;
    console.log(JSON.stringify(query));
    return query;
};

