import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {FrontEndRecruitmentModels} from "../models/RecruitmentModels";
import RecruitmentRecords = FrontEndRecruitmentModels.RecruitmentRecords;
import {RecruitmentActionTypes} from "../constants/action.types/RecruitmentActionTypes";
export interface RecruitmentRecordsReducerState{
    status: ReducerStateStatus;
    records: RecruitmentRecords;
    lastUpdated: number;
}

const initialState: RecruitmentRecordsReducerState = {
    status: ReducerStateStatus.LOADING,
    records: new RecruitmentRecords(),
    lastUpdated: Date.now(),
};

const getLoadingState = (state: RecruitmentRecordsReducerState): RecruitmentRecordsReducerState => {
    let newState = {...state};
    newState.status = ReducerStateStatus.LOADING;
    return newState;
};

const getOKState = (state: RecruitmentRecordsReducerState, data: RecruitmentRecords): RecruitmentRecordsReducerState => {
    let newState = {...state};
    newState.status = ReducerStateStatus.DONE;
    newState.records = data;
    newState.lastUpdated = Date.now();
    return newState;
};

export const RecruitmentRecordsReducer = (state = initialState, action): RecruitmentRecordsReducerState => {
  switch(action.type){
      case RecruitmentActionTypes.GetRecruitmentRecordsRequest:
          return getLoadingState(state);
      case RecruitmentActionTypes.GetRecruitmentRecordsOK:
          return getOKState(state, action);

      default:
          return state;
  }
};

