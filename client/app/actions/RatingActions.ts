import {BaseActions} from "./BaseActions";
import {TeammateRecordDto} from "../../../server/dtos/rating/TeammateRecordDto";
import {RatingApiController} from "../api.controllers/RatingApiController";
import {TeammateRatingDto} from "../../../server/dtos/rating/TeammateRatingDto";
import {RatingActionTypes} from "../constants/action.types/RatingActionTypes";
import {RouterController} from "../api.controllers/RouterController";
import {Routes} from "../constants/Routes";

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
                });
                RouterController.history.push(Routes.rating.replace(":id", res.data._id));
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

    static updateRating(teammateRecordDto: TeammateRatingDto, teammateRecordId: string) {
        return function (dispatch) {
            dispatch({
                type: RatingActionTypes.UpdateRatingRequest,
            });
            apiController.updateRating(teammateRecordDto, teammateRecordId).then((res) => {
                dispatch({
                    type: RatingActionTypes.UpdateRatingOK,
                    data: res.data
                })
            }).catch((err) => RatingActions.handleError(dispatch, err, RatingActionTypes.UpdateRatingError));
        }
    }

    static searchForTeammate(teammateRecordDto: TeammateRecordDto) {
        return function (dispatch) {
            dispatch({
                type: RatingActionTypes.SearchTeammatePreviewRequest,
            });
            apiController.searchForTeammate(teammateRecordDto).then((res) => {
                dispatch({
                    type: RatingActionTypes.SearchTeammatePreviewOK,
                    data: res.data
                });
            }).catch((err) =>
                RatingActions.handleError(dispatch, err, RatingActionTypes.SearchTeammatePreviewError));
        }
    }

    static BlurrySearch(InputStrings: string[]) {
        return function(dispatch) {
            dispatch({
                type: RatingActionTypes.BlurrySearchPreviewRequest,
            });
            apiController.BlurryTeammateSearch(InputStrings).then((res) => {
                dispatch({
                    type: RatingActionTypes.BlurrySearchPreviewOK,
                    data: res.data,
                });
            }).catch((err) =>
                RatingActions.handleError(dispatch, err, RatingActionTypes.BlurrySearchPreviewError));
        }
    }




}