import {BaseActions} from "./BaseActions";
import {DashboardActionTypes} from "../constants/DashboardActionTypes";
import {DashboardAPIController} from "../api.controllers/DashboardAPIController";


const controller = DashboardAPIController;

export class DashboardActions extends BaseActions {
    static fetchDashboardAction = () => {
        return function (dispatch) {
            dispatch({
                type: DashboardActionTypes.FetchDashboardDataReq
            });
            controller.fetchDashboardData().then((res) => {
                dispatch({
                    type: DashboardActionTypes.FetchDashboardDataOK,
                    data: res.data
                });
            }).catch(err=> DashboardActions.handleError(dispatch, err, DashboardActionTypes.FetchDashboardDataErr))
        }
    }
}