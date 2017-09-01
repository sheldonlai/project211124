export const getHottestQuery = () => {
    let query: any = {
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
    return query;
};