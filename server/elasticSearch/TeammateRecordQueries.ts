import {UniversityDto} from "../dtos/location/UniversityDto";

export const SearchByNameAndUniversityQuery = (firstName: string, lastName: string,
                                               university: UniversityDto, year?: number) => {
    let query = ({
        "bool": {
            "must": [
                {"prefix" : { "firstName" : firstName }},
                {"prefix" : { "lastName" : lastName }}
            ],
        }
    });
    let shouldArray: any[] = [
        {"match": {"firstName": firstName}},
        {"match": {"lastName": lastName}},
    ];
    if (university) {
        shouldArray.push({
            "match": {
                "university.name": university.name
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
    return query;
};