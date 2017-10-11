import {ReducerStateStatus} from "../constants/ReducerStateStatus";
import {RecruitmentPreviewDto} from "../../../server/dtos/recruitment/RecruitmentPreviewDto";
import {RecruitmentActionTypes} from "../constants/action.types/RecruitmentActionTypes";
import {RecruitmentPreviewCollectionsDto} from "../../../server/dtos/recruitment/RecruitmentPreviewCollectionsDto";
import {FrontEndRecruitmentModels} from "../models/RecruitmentModels";
import RecruitmentPreview = FrontEndRecruitmentModels.RecruitmentPreview;

export interface RecruitmentHomeReducerState{
    status: ReducerStateStatus,
    featuredRecruitments: RecruitmentPreview[],
    myRecruitments: RecruitmentPreview[],
    lastUpdated: number,
    error: string,
}

const initialState: RecruitmentHomeReducerState = {
    status: ReducerStateStatus.LOADING,
    featuredRecruitments: [],
    myRecruitments: [],
    lastUpdated: Date.now(),
    error: '',
}

export const RecruitmentHomeReducer = (state = initialState, action): RecruitmentHomeReducerState => {
    switch (action.type){
        case RecruitmentActionTypes.GetRecruitmentPreviewRequest:
            return{
                status: ReducerStateStatus.LOADING,
                featuredRecruitments: [],
                myRecruitments: [],
                lastUpdated: Date.now(),
                error: '',
            };
        case RecruitmentActionTypes.GetRecruitmentPreviewOK:
            let data: RecruitmentPreviewCollectionsDto = action.data;
            let featuredRecruitments: RecruitmentPreview[] = data.featuredRecruitments.map(r => {
                return RecruitmentPreview.recruitmentPreviewModelToDto(r);
            });
            let myRecruitments: RecruitmentPreview[] = data.myRecruitments.map(r => {
                return RecruitmentPreview.recruitmentPreviewModelToDto(r);
            });
            return{
                status: ReducerStateStatus.DONE,
                featuredRecruitments: featuredRecruitments,
                myRecruitments: myRecruitments,
                lastUpdated: Date.now(),
                error: '',
            };

        default:
            return state;
    }
}