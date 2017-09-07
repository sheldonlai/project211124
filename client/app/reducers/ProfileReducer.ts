import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {ProfileActionTypes} from "../constants/action.types/ProfileActionTypes";
import {FrontEndQuestionModels} from "../models/ProfileModels";
import ProfilePage = FrontEndQuestionModels.ProfilePage;

export interface ProfileReducerState {
    status : ReducerStateStatus;
    profile: ProfilePage;

}

const initialState : ProfileReducerState = {
    status : ReducerStateStatus.NONE,
    profile: undefined
};

const getLoadingState = (state: ProfileReducerState) => {
    state = {...state};
    state.status = ReducerStateStatus.LOADING;
    return state;
};

export const ProfileReducer = (state = initialState, action) : ProfileReducerState => {
    switch (action.type) {
        case ProfileActionTypes.ProfileFetchReq:
            return getLoadingState(state);
        case ProfileActionTypes.ProfileFetchOK:
            state = {...state};
            state.status = ReducerStateStatus.DONE;
            state.profile = action.data;
            return state;
        case ProfileActionTypes.ProfileFetchErr:
            state = {...state};
            state.status = ReducerStateStatus.ERROR;
            return state;
        default:
            return state;
    }
};