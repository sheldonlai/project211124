/**
 * Created by SHELDON on 6/22/2017.
 */
import {ErrorActionTypes} from "../constants/action.types/ErrorActionTypes";
import {ClientError, HttpStatus} from "../../../server/errors/HttpStatus";

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
        if(err == 'Error: Request failed with status code 401'){
            alert('You are not authorized for this action!');
        }
        console.error(err)
    }
}