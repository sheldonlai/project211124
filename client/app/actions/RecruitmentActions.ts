import {RecruitmentAPIController} from "../api.controllers/RecruitmentAPIController";
import {BaseActions} from "./BaseActions";
import {RecruitmentDto} from "../../../server/dtos/recruitment/RecruitmentDto";
import {RecruitmentActionTypes} from "../constants/action.types/RecruitmentActionTypes";
import {RouterController} from "../api.controllers/RouterController";
import {Routes} from "../constants/Routes";
import {RatingActions} from "./RatingActions";
import {RecruitmentCommentDto} from "../../../server/dtos/recruitment/RecruitmentCommenDto";

let apiController: RecruitmentAPIController = RecruitmentAPIController.getInstance();

export class RecruitmentActions extends BaseActions{

    static createRecruitment(recruitmentObj: RecruitmentDto){
        return function (dispatch){
            dispatch({
                type: RecruitmentActionTypes.CreateRecruitmentRequest
            });
            apiController.createRecruitment(recruitmentObj).then(res => {
                dispatch({
                    type: RecruitmentActionTypes.CreateRecruitmentOK,
                    data: res.data
                });
                RouterController.history.push(Routes.recruitment_by_id.replace(":id", res.data._id));
            }).catch(err => RecruitmentActions.handleError(dispatch, err, RecruitmentActionTypes.CreateRecruitmentError));
        }
    }

    static fetchRecruitmentPage(id: string){
        return function(dispatch){
            dispatch({
                type: RecruitmentActionTypes.FetchRecruitmentPageRequest
            });
            apiController.fetchRecruitmentPage(id).then((res) => {
                dispatch({
                    type: RecruitmentActionTypes.FetchRecruitmentPageOK,
                    data: res.data
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
                dispatch({
                    type: RecruitmentActionTypes.AddCommentOK,
                    data: res.data
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

            })
        }
    }
}