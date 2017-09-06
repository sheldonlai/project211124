import {BaseActions} from "./BaseActions";
import {ProfileActionTypes} from "../constants/action.types/ProfileActionTypes";
import {ProfileApiController} from "../api.controllers/ProfileApiController";

let apiController = ProfileApiController;

export class ProfileActions extends BaseActions {

    static fetchUserProfile(username: string){
        return function(dispatch) {
            dispatch({type: ProfileActionTypes.ProfileFetchReq});
            apiController.fetchProfilePage(username).then(res => {
                dispatch({
                    type: ProfileActionTypes.ProfileFetchOK,
                    data: res.data
                });
            }).catch(err=> ProfileActions.handleError(dispatch, err, ProfileActionTypes.ProfileFetchErr))
        }
    }

}