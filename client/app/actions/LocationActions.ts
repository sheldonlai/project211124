
import {BaseActions} from "./BaseActions";
import {CommonController} from "../api.controllers/CommonController";
import {LocationActionTypes} from "../constants/action.types/LocationActionTypes";

let apiController : CommonController = CommonController.getInstance();

export class LocationActions extends BaseActions {

    static getCounties() {
        return function(dispatch) {
            dispatch({type: LocationActionTypes.CountriesRequest});
            apiController.getCountries().then(res => {
                dispatch({
                    type: LocationActionTypes.CountriesOK,
                    data : res.data
                });
            }).catch(err=> LocationActions.handleError(dispatch, err, LocationActionTypes.CountriesError))
        }
    }

    static getUniversities(countryId: string) {
        return function(dispatch) {
            dispatch({type: LocationActionTypes.UniversityRequest});
            apiController.getUniversities(countryId).then(res => {
                dispatch({
                    type: LocationActionTypes.UniversityOK,
                    data : res.data
                });
            }).catch(err=> LocationActions.handleError(dispatch, err, LocationActionTypes.UniversityError))
        }
    }


}