import * as React from "react";
import {Component} from "react";
import TextField from "material-ui/TextField";
import {RegistrationRequest} from "../../models/RegistrationRequest";
import {FormWrapper} from "../../components/FormWrapper";
import {ErrorView} from "../../components/ErrorView";
import RaisedButton from "material-ui/RaisedButton";
import {connect} from "react-redux";
import {CommonController} from "../../api.controllers/CommonController";
import {Routes} from "../../constants/Routes";
import {RouterController} from "../../api.controllers/RouterController";
import {AppStoreState} from "../../stores/AppStore";

export interface RegistrationViewState {
    error : string;
    regRequest : RegistrationRequest;
    confirmPassword : string;
    passwordError  : string;
}

export interface RegistrationViewProps {
    loggedIn : boolean;
    register : (regReq : RegistrationRequest) => void;
}

export class RegistrationView extends Component<RegistrationViewProps, RegistrationViewState>{

    apiController : CommonController;
    constructor (props) {
        super(props);
        this.state = {
            error: '',
            regRequest : new RegistrationRequest(),
            confirmPassword : '',
            passwordError : ''
        }
        this.apiController = CommonController.getInstance();
    }

    updateRequest = (key: string, value: string) => {
        let regRequest = this.state.regRequest;
        regRequest[key] = value;
        this.setState({regRequest : regRequest});
    }

    updatePassword = (event) => {
        this.updateRequest('password', event.target.value);
    }

    updateUsername = (event) => {
        this.updateRequest('name', event.target.value);
    }

    updateEmail = (event) => {
        this.updateRequest('email', event.target.value);
    }

    updateConfirmPassword = (event) => {
        this.setState({confirmPassword : event.target.value});
    }

    submit =()=> {
        if(this.state.regRequest.password != this.state.confirmPassword){
            this.setState({passwordError : 'Password not matched'});
            return;
        }
        this.apiController.registerUser(this.state.regRequest).then(res => {
            this.apiController.setToken(res.data.token);
            RouterController.history.push(Routes.login);
        }).catch(err=> {
            console.log(err.response.data.error);
            this.setState({error : err.response.data.error});
        })
    }

    render(){
        return (
            <FormWrapper>
                <ErrorView errorTxt={this.state.error}/>
                <TextField
                    floatingLabelText="email"
                    hintText="email"
                    onChange={this.updateEmail}
                /><br/>
                <TextField
                    floatingLabelText="name"
                    hintText="name"
                    onChange={this.updateUsername}
                /><br />
                <TextField
                    errorText={this.state.passwordError}
                    floatingLabelText="password"
                    hintText="password"
                    type="password"
                    onChange={this.updatePassword}
                /><br />
                <TextField
                    floatingLabelText="Confirm password"
                    hintText="Confirm Password"
                    type="password"
                    onChange={this.updateConfirmPassword}
                /><br />
                <RaisedButton onTouchTap={this.submit} label="Submit"/>
            </FormWrapper>
        )
    }
}

export const RegistrationPage = connect(
    (state: AppStoreState)=> ({loggedIn: state.auth.loggedIn})
)(RegistrationView)