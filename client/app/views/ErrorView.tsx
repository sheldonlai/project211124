
import * as React from "react";
import Snackbar from 'material-ui/Snackbar';
import {connect} from "react-redux";
import {AppStoreState} from "../stores/AppStore";
import Slide from 'material-ui/transitions/Slide';
import {ErrorActionTypes} from "../constants/action.types/ErrorActionTypes";
import {ErrorObject} from "../reducers/ErrorReducer";

export interface ErrorComponentProps {
    errors: ErrorObject[];
    removeError: () => void;
}

export interface ErrorComponentState {

}

export class ErrorComponent extends React.Component<ErrorComponentProps, any>{

    handleRequestClose = () => {
        this.props.removeError();
    };

    render () {
        if (this.props.errors.length < 1){
            return null;
        }
        return (
            <Snackbar
                anchorOrigin={{ vertical:  'top', horizontal:'center' }}
                open={this.props.errors.length < 1}
                transition={<Slide direction={'left'} />}
                onRequestClose={this.handleRequestClose}
                contentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.errors[0]}</span>}
            />
        )
    }
}

export const ErrorSnackBar = connect<any, any, any>(
    (state: AppStoreState) => ({
        errors : state.errors.errors
    }),
    dispatch => ({removeError : dispatch({type: ErrorActionTypes.REMOVE_ERROR})})
)(ErrorComponent);