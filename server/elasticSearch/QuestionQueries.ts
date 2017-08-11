import {UserPreferences} from "../models/UserPerferences";

export const SearchByNameAndUniversityQuery = (userPreference: UserPreferences) => {

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
  for (let tag in  tagPref){
    sampleQuery.bool.should.push({
      term: {
        "tags.tag" : {
          "value" : tag,
          "boost": (tagPref[tag] * 10)
        }
      }
    });
  }
  for (let cat in catPref){
    sampleQuery.bool.should.push({
      "category" : {
          "value" : cat,
          "boost": (tagPref[cat] * 10)
        }
    })
  }
  return sampleQuery;
};