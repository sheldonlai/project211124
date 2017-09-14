import {BaseActions} from "./BaseActions";
import {NotificationActionTypes} from "../constants/action.types/NotificationActionTypes";
import {NotificationAPIController} from "../api.controllers/NotificationAPIController";

export class NotificationActions extends BaseActions {
    fetchNotifications () {
        return function (dispatch) {
            dispatch({type: NotificationActionTypes.NotificationFetchReq})
            NotificationAPIController.fetchNotifications().then((res) => {
                dispatch({type: NotificationActionTypes.NotificationFetchOK, data: res.data})
            }).catch(err =>
                NotificationActions.handleError(dispatch, err, NotificationActionTypes.NotificationFetchErr));
        }
    }
}