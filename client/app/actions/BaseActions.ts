/**
 * Created by SHELDON on 6/22/2017.
 */
import {ErrorActionTypes} from "../constants/ErrorActionTypes";

export class BaseActions {

    static addError(message){
        return {
            type: ErrorActionTypes.ADD_ERROR,
            data: message
        }
    }

    static handleError(dispatch, err, otherErrorType?){
        let errorData = undefined;
        if (err.response != null){
            // error is coming from api controller
            errorData = err.response.data.error;
        } else {
            errorData = err.message;
        }
        // always dispatch add_error to track
        dispatch({
            type: ErrorActionTypes.ADD_ERROR,
            data: errorData
        });
        if (otherErrorType)
            dispatch({
                type: otherErrorType,
                data: errorData
            });
        console.error(err)
    }
}