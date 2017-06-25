/**
 * Created by SHELDON on 6/22/2017.
 */
import {AxiosError} from "axios";
import {ErrorActionTypes} from "../constants/ErrorActionTypes";

export class BaseActions {

    static handleError(dispatch, err, otherErrorType?){
        if (err.response != null){
            dispatch({
                type: ErrorActionTypes.ADD_ERROR,
                data: err.response.data.error
            })
        } else {
            dispatch({
                type: otherErrorType,
                data: err.message
            })
        }
        console.error(err)
    }
}