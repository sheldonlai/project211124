import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {CountryDto} from "../../../server/dtos/location/CountryDto";
import {UniversityDto} from "../../../server/dtos/location/UniversityDto";
import {LocationActionTypes} from "../constants/action.types/LocationActionTypes";

export interface LocationDataReducerState {
    status : ReducerStateStatus;
    countries: CountryDto[];
    universitiesMap : UniversitiesMap;
}

export interface UniversitiesMap {
    [country: string] : UniversityDto[];
}

const initialState : LocationDataReducerState = {
    status : ReducerStateStatus.NONE,
    countries: [],
    universitiesMap: {}
};

const getLoadingState = (state: LocationDataReducerState) => {
    state = {...state};
    state.status = ReducerStateStatus.LOADING;
    return state;
};

export const LocationDataReducer = (state = initialState, action) : LocationDataReducerState => {
    switch (action.type) {
        case LocationActionTypes.CountriesRequest:
            return getLoadingState(state);
        case LocationActionTypes.CountriesOK:
            state = {...state};
            state.status = ReducerStateStatus.DONE;
            state.countries = action.data;
            return state;
        case LocationActionTypes.UniversityRequest:
            return getLoadingState(state);
        case LocationActionTypes.UniversityOK:
            let unis : UniversityDto[] = action.data;
            state = {...state};
            state.status = ReducerStateStatus.DONE;
            if (unis.length > 0){
                state.universitiesMap = {...state.universitiesMap};
                state.universitiesMap[unis[0].country.name] = unis;
            }
            return state;

        default:
            return state;
    }
};