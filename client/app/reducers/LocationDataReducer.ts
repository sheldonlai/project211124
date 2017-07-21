import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {CountryDto} from "../../../server/dtos/location/CountryDto";
import {UniversityDto} from "../../../server/dtos/location/UniversityDto";
import {LocationActionTypes} from "../constants/LocationActionTypes";

export interface LocationDataReducerState {
    status : ReducerStateStatus;
    countries: CountryDto[];
    selectedCountry: CountryDto;
    universities: UniversityDto[];
}

const initialState : LocationDataReducerState = {
    status : ReducerStateStatus.NONE,
    countries: [],
    selectedCountry: undefined,
    universities: [],
};

const getLoadingState = (state: LocationDataReducerState) => {
    state.status = ReducerStateStatus.LOADING
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

        default:
            return state;
    }
};