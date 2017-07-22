
import {BaseActions} from "./BaseActions";
import {CommonController} from "../api.controllers/CommonController";
import {LocationActionTypes} from "../constants/LocationActionTypes";
import {UserActionTypes} from "../constants/UserActionTypes";
import {UserDto} from "../../../server/dtos/auth/UserDto";
import {UserApiController} from "../api.controllers/UserApiController";
import * as JwtDecode  from "jwt-decode";

let apiController : UserApiController = UserApiController.getInstance();

export class UserActions extends BaseActions {

    static updateUserProfile(user: UserDto){
        return function(dispatch) {
            dispatch({type: UserActionTypes.UserUpdateRequest});
            apiController.updateUser(user).then(res => {
                let data: {token: string} = res.data;
                apiController.setToken(data.token);
                dispatch({
                    type: UserActionTypes.UserUpdateOK
                });
            }).catch(err=> UserActions.handleError(dispatch, err, UserActionTypes.UserUpdateError))
        }
    }

}