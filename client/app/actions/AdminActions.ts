import {AdminActionTypes} from "../constants/AdminActionTypes";
import {AdminController} from "../api.controllers/AdminController";
import {BaseActions} from "./BaseActions";
import {DashboardSettingsDto} from "../../../server/dtos/admin/DashboardSettingsDto";

const controller = AdminController;

export class AdminActions extends BaseActions{
    static getDashboardSettings(){
        return function (dispatch) {
            dispatch({
                type: AdminActionTypes.getDashBoardSettingsReq
            })
            controller.getDashboardSettings().then((res) => {
                dispatch({
                    type: AdminActionTypes.getDashBoardSettingsOK,
                    data: res.data
                })
            }).catch((err) => {
                AdminActions.handleError(dispatch, err, AdminActionTypes.getDashBoardSettingsErr)
            })
        }
    }

    static setDashboardSettings(data: DashboardSettingsDto){
        return function (dispatch) {
            dispatch({
                type: AdminActionTypes.setDashBoardSettingsReq
            })
            controller.setDashboardSettings(data).then((res) => {
                dispatch({
                    type: AdminActionTypes.setDashBoardSettingsOK,
                    data: res.data
                })
            }).catch((err) => {
                AdminActions.handleError(dispatch, err, AdminActionTypes.setDashBoardSettingsErr)
            })
        }
    }

}