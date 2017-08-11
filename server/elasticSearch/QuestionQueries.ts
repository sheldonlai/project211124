import {UniversityDto} from "../dtos/location/UniversityDto";
import {UserPreferences} from "../models/UserPerferences";

export const SearchByNameAndUniversityQuery = (userPreference: UserPreferences) => {
  let tagPref = userPreference.question_pref.tags_vec;
  let catPref = userPreference.question_pref.cat_vec;

  let query = {
    "function_score": {
      "query": {"match_all": {}},
      "boost": "5",
      "functions": [
        {
          "filter": {"match": {"test": "bar"}},
          "random_score": {},
          "weight": 23
        },
        {
          "filter": {"match": {"test": "cat"}},
          "weight": 42
        }
      ],
      "script_score": {
        "script": {
          "inline": "Math.log(2 + doc['likes'].value)"
        }
      }
    }
  };
  let sampleQuery = {
    "function_score": {
      "query": {
        "bool": {
          "should": [
            {
              "term": {
                "tags.tag": {
                  "value": "0",
                  "boost": 5
                }
              }
            },
            {
              "term": {
                "tags.tag": {
                  "value": "abc",
                  "boost": 6
                }
              }
            },
            {
              "range": {
                "createdUtc": {
                  "gte": "2016",
                  "format": "yyyy"
                }
              }
            }
          ]
        }
      },
      "functions": [
        {
          "field_value_factor": {
            "field": "views",
            "factor": 0.001
          }
        },
        {
          "filter": {"term": {"tags.tag": "cat"}},
          "weight": 42
        }
      ]
    }
  }
  return query;
};