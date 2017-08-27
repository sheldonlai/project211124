import * as React from "react";
import {Component} from "react";
import TextField from "material-ui/TextField";
import {FormWrapper} from "../../components/FormWrapper";
import {ErrorView} from "../../components/ErrorView";
import Button from "material-ui/Button";
import {connect} from "react-redux";
import {CommonController} from "../../api.controllers/CommonController";
import {Routes} from "../../constants/Routes";
import {RouterController} from "../../api.controllers/RouterController";
import {AppStoreState} from "../../stores/AppStore";
import {FrontEndAuthModels} from "../../models/AuthModels";
import {EmailNameInputStyles} from "../../constants/StyleClasses";
import RegistrationRequest = FrontEndAuthModels.RegistrationRequest;

export interface RegistrationViewState {
    error : string;
    regRequest : RegistrationRequest;
    confirmPassword : string;
    passwordError  : string;
}

export interface RegistrationViewProps {
    loggedIn : boolean;
}

export class RegistrationForm extends Component<RegistrationViewProps, RegistrationViewState>{

    apiController : CommonController;
    constructor (props) {
        super(props);
        this.state = {
            error: '',
            regRequest : new RegistrationRequest(),
            confirmPassword : '',
            passwordError : ''
        };
        this.apiController = CommonController.getInstance();
    }

    updateRequest = (key: string, value: string) => {
        let regRequest = this.state.regRequest;
        regRequest[key] = value;
        this.setState({regRequest : regRequest});
    };

    updatePassword = (event) => {
        this.updateRequest('password', event.target.value);
    };

    updateUsername = (event) => {
        this.updateRequest('username', event.target.value);
    };

    updateEmail = (event) => {
        this.updateRequest('email', event.target.value);
    };

    updateConfirmPassword = (event) => {
        this.setState({confirmPassword : event.target.value});
    };

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
    };

    render(){
        return (
            <div>
                <ErrorView errorTxt={this.state.error}/>
                <TextField
                    label="Email"
                    onChange={this.updateEmail}
                    inputProps={EmailNameInputStyles}
                /><br/>
                <TextField
                    label="Username"
                    onChange={this.updateUsername}
                /><br />
                <TextField
                    error={!!this.state.passwordError}
                    label="password"
                    type="password"
                    onChange={this.updatePassword}
                /><br />
                <TextField
                    label="confirm password"
                    type="password"
                    onChange={this.updateConfirmPassword}
                />
                <div style={{padding: 10}}>
                <Button raised color="primary" onClick={this.submit}>Submit</Button>
                </div>
            </div>
        )
    }
}

export const RegistrationPage = connect(
    (state: AppStoreState)=> ({loggedIn: state.auth.loggedIn}),
    (dispatch) => ({})
)(RegistrationForm);