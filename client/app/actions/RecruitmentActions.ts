import {RecruitmentAPIController} from "../api.controllers/RecruitmentAPIController";
import {BaseActions} from "./BaseActions";
import {RecruitmentDto, RecruitmentRequestDto} from "../../../server/dtos/recruitment/RecruitmentDto";
import {RecruitmentActionTypes} from "../constants/action.types/RecruitmentActionTypes";
import {RouterController} from "../api.controllers/RouterController";
import {Routes} from "../constants/Routes";
import {RatingActions} from "./RatingActions";
import {RecruitmentCommentDto} from "../../../server/dtos/recruitment/RecruitmentCommenDto";
import {UserDto} from "../../../server/dtos/auth/UserDto";
import {FrontEndRecruitmentModels} from "../models/RecruitmentModels";
import Recruitment = FrontEndRecruitmentModels.Recruitment;
import recruitmentDtoToModel = FrontEndRecruitmentModels.recruitmentDtoToModel;
import recruitmentModelToDto = FrontEndRecruitmentModels.recruitmentModelToDto;
import RecruitmentRecords = FrontEndRecruitmentModels.RecruitmentRecords;
import recordsDtoToModel = FrontEndRecruitmentModels.recordsDtoToModel;
import RecruitmentRecordEntity = FrontEndRecruitmentModels.RecruitmentRecordEntity;
import {RecruitmentRecordEntityDto} from "../../../server/dtos/recruitment/RecruitmentRecordsDto";

let apiController: RecruitmentAPIController = RecruitmentAPIController.getInstance();

export class RecruitmentActions extends BaseActions{

    static getRecruitmentPreviews(){
        return function(dispatch){
            dispatch({
                type: RecruitmentActionTypes.GetRecruitmentPreviewRequest,
            });
            apiController.getRecruitmentPreview().then(res => {
                dispatch({
                    type: RecruitmentActionTypes.GetRecruitmentPreviewOK,
                    data: res.data,
                });
            }).catch(err => RecruitmentActions.handleError(dispatch, err, RecruitmentActionTypes.GetRecruitmentPreviewError));
        }
    }

    static createRecruitment(recruitmentObj: RecruitmentDto){
        return function (dispatch){
            dispatch({
                type: RecruitmentActionTypes.CreateRecruitmentRequest
            });
            apiController.createRecruitment(recruitmentObj).then(res => {
                let data: Recruitment = recruitmentDtoToModel(res.data);
                dispatch({
                    type: RecruitmentActionTypes.CreateRecruitmentOK,
                    data: data,
                });
                let title = encodeURIComponent(res.data.title).replace(/%20/g, '-');
                title = encodeURIComponent(title).replace(/%3F/g, '');
                RouterController.history.push(Routes.recruitment_by_id.replace(":id", res.data._id).replace(":name", title));
            }).catch(err => RecruitmentActions.handleError(dispatch, err, RecruitmentActionTypes.CreateRecruitmentError));
        }
    }

    static editRecruitment(recruitmentObj: RecruitmentDto){
        return function(dispatch){
            dispatch({
                type: RecruitmentActionTypes.EditRecruitmentRequest,
            });
            apiController.editRecruitment(recruitmentObj).then(res => {
                let data: Recruitment = recruitmentDtoToModel(res.data);
                dispatch({
                    type: RecruitmentActionTypes.EditRecruitmentOK,
                    data: data,
                })
            }).catch(err => RecruitmentActions.handleError(dispatch, err, RecruitmentActionTypes.EditRecruitmentError));
        }
    }

    static fetchRecruitmentPage(id: string){
        return function(dispatch){
            dispatch({
                type: RecruitmentActionTypes.FetchRecruitmentPageRequest
            });
            apiController.fetchRecruitmentPage(id).then((res) => {
                let data: Recruitment = recruitmentDtoToModel(res.data);
                dispatch({
                    type: RecruitmentActionTypes.FetchRecruitmentPageOK,
                    data: data,
                })
            }).catch(err => RatingActions.handleError(dispatch, err, RecruitmentActionTypes.FetchRecruitmentPageError))
        }
    }

    static addRecruitmentComment(comment: RecruitmentCommentDto, recruitmentId: string){
        return function(dispatch){
            dispatch({
                type: RecruitmentActionTypes.AddCommentRequest
            });
            apiController.addRecruitmentComment(comment, recruitmentId).then((res) => {
                let data: Recruitment = recruitmentDtoToModel(res.data);
                dispatch({
                    type: RecruitmentActionTypes.AddCommentOK,
                    data: data,
                })
            }).catch(err => RatingActions.handleError(dispatch, err, RecruitmentActionTypes.AddCommentError))
        }
    }

    static updateComment(comment: RecruitmentCommentDto, recruitmentId: string){
        return function(dispatch){
            dispatch({
                type: RecruitmentActionTypes.EditCommentRequest
            });
            apiController.updateRecruitmentComment(comment, recruitmentId).then((res) => {
                let data: Recruitment = recruitmentDtoToModel(res.data);
                dispatch({
                    type: RecruitmentActionTypes.EditCommentOK,
                    data: data,
                })
            }).catch(err => RatingActions.handleError(dispatch, err, RecruitmentActionTypes.EditCommentError))
        }
    }

    static recruitMember(member: UserDto, recruitmentId: string){
        return function(dispatch){
            dispatch({
                type: RecruitmentActionTypes.RecruitMemberRequest
            });
            apiController.recruitMember(member, recruitmentId).then(res => {
                let data: Recruitment = recruitmentDtoToModel(res.data);
                dispatch({
                    type: RecruitmentActionTypes.RecruitMemberOK,
                    data: data,
                })
            }).catch(err => RatingActions.handleError(dispatch, err, RecruitmentActionTypes.RecruitMemberError))
        }
    }

    static joinRecruitment(request: RecruitmentRequestDto, recruitmentId: string){
        return function(dispatch){
            dispatch({
                type: RecruitmentActionTypes.JoinRecruitmentRequest,
            });
            apiController.joinRecruitment(request, recruitmentId).then(res => {
                let data: Recruitment = recruitmentDtoToModel(res.data);
                dispatch({
                    type: RecruitmentActionTypes.JoinRecruitmentOK,
                    data: data,
                })
            }).catch(err => RatingActions.handleError(dispatch, err, RecruitmentActionTypes.JoinRecruitmentError))
        }
    }

    static addRecruitmentRecord(recordEntity: RecruitmentRecordEntityDto, recordsId: string){
        return function(dispatch){
            dispatch({
                type: RecruitmentActionTypes.AddRecruitmentRecordRequest,
            });
            apiController.addRecruitmentRecord(recordEntity, recordsId).then(res => {
                let data: RecruitmentRecords = recordsDtoToModel(res.data);
                dispatch({
                    type: RecruitmentActionTypes.AddRecruitmentRecordOK,
                    data: data,
                })
            }).catch(err => RecruitmentActions.handleError(dispatch, err, RecruitmentActionTypes.AddCommentError))
        }
    }

    static getRecruitmentRecords(){
        return function(dispatch){
            dispatch({
                type: RecruitmentActionTypes.GetRecruitmentRecordsRequest,
            });
            apiController.getRecruitmentRecords().then(res => {
                let data: RecruitmentRecords = recordsDtoToModel(res.data);
                console.log(data.records);
                dispatch({
                    type: RecruitmentActionTypes.GetRecruitmentRecordsOK,
                    data: data,
                })
            }).catch(err => RecruitmentActions.handleError(dispatch, err, RecruitmentActionTypes.GetRecruitmentRecordsError));
        }
    }

    static updateRecruitmentRequest(request: RecruitmentRequestDto, recruitmentId:string, accepted: boolean){
        return function(dispatch){
            dispatch({
                type: RecruitmentActionTypes.UpdateRecruitmentRequestRequest,
            });
            apiController.updateRecruitmentRequest(request, recruitmentId, accepted).then(res => {
                let data: Recruitment = recruitmentDtoToModel(res.data);
                dispatch({
                    type: RecruitmentActionTypes.UpdateRecruitmentRequestOK,
                    data: data,
                })
            }).catch(err => RecruitmentActions.handleError(dispatch, err, RecruitmentActionTypes.UpdateRecruitmentRequestError));
        }
    }

    static updateRecruitmentRecord(recruitmentId: string, member: UserDto, accepted: boolean){
        return function(dispatch){
            dispatch({
                type: RecruitmentActionTypes.UpdateRecruitmentRecordRequest,
            });
            apiController.updateRecruitmentRecord(recruitmentId, member, accepted).then(res => {
                let data: RecruitmentRecords = recordsDtoToModel(res.data);
                dispatch({
                    type: RecruitmentActionTypes.UpdateRecruitmentRecordOK,
                    data: data,
                });
            }).catch(err => RecruitmentActions.handleError(dispatch, err, RecruitmentActionTypes.UpdateRecruitmentRecordError));
        }
    }
}