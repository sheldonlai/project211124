import {BaseActions} from "./BaseActions";
import {TeammateRecordDto} from "../../../server/dtos/rating/TeammateRecordDto";
import {RatingApiController} from "../api.controllers/RatingApiController";
import {TeammateRatingDto} from "../../../server/dtos/rating/TeammateRatingDto";
import {RatingActionTypes} from "../constants/RatingActionTypes";

const apiController = RatingApiController.getInstance();

export class RatingActions extends BaseActions {
    static createTeammateRecord(teammateRecordDto: TeammateRecordDto) {
        return function (dispatch) {
            dispatch({
                type: RatingActionTypes.CreateTeammateRecordRequest,
            });
            apiController.createTeammateRecord(teammateRecordDto).then((res) => {
                dispatch({
                    type: RatingActionTypes.CreateTeammateRecordOK,
                    data: res.data
                })
            }).catch((err) => RatingActions.handleError(dispatch, err, RatingActionTypes.CreateTeammateRecordError));
        }
    }

    static getTeammateRecordPreview() {
        return function (dispatch) {
            dispatch({
                type: RatingActionTypes.GetTeammateRecordPreviewRequest,
            });
            apiController.getTeammateRecordPreview().then((res) => {
                dispatch({
                    type: RatingActionTypes.GetTeammateRecordPreviewOK,
                    data: res.data
                })
            }).catch((err) => RatingActions.handleError(dispatch, err, RatingActionTypes.GetTeammateRecordPreviewError));
        }
    }

    static getTeammateRecord(teammateRecordId: string) {
        return function (dispatch) {
            dispatch({
                type: RatingActionTypes.GetTeammateRecordRequest,
            });
            apiController.getTeammateRecord(teammateRecordId).then((res) => {
                dispatch({
                    type: RatingActionTypes.GetTeammateRecordOK,
                    data: res.data
                })
            }).catch((err) => RatingActions.handleError(dispatch, err, RatingActionTypes.GetTeammateRecordError));
        }
    }

    static addRating(teammateRecordDto: TeammateRatingDto, teammateRecordId: string) {
        return function (dispatch) {
            dispatch({
                type: RatingActionTypes.AddRatingRequest,
            });
            apiController.addRating(teammateRecordDto, teammateRecordId).then((res) => {
                dispatch({
                    type: RatingActionTypes.AddRatingOK,
                    data: res.data
                })
            }).catch((err) => RatingActions.handleError(dispatch, err, RatingActionTypes.AddRatingError));
        }
    }

    static editRating(teammateRecordDto: TeammateRatingDto, teammateRecordId: string) {
        return function (dispatch) {
            dispatch({
                type: RatingActionTypes.EditRatingRequest,
            });
            apiController.editRating(teammateRecordDto, teammateRecordId).then((res) => {
                dispatch({
                    type: RatingActionTypes.EditRatingOK,
                    data: res.data
                })
            }).catch((err) => RatingActions.handleError(dispatch, err, RatingActionTypes.EditRatingError));
        }
    }


}