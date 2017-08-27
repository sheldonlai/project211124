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
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

export interface RegistrationViewState {
    error: string;
    usernameOK: boolean;
    emailOK: boolean;
    regRequest: RegistrationRequest;
    confirmPassword: string;
    passwordError: string;
}

export interface RegistrationViewProps {
    loggedIn: boolean;
}

export class RegistrationForm extends Component<RegistrationViewProps, RegistrationViewState> {

    apiController: CommonController;

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            usernameOK: true,
            emailOK: true,
            regRequest: new RegistrationRequest(),
            confirmPassword: '',
            passwordError: ''
        };
        this.apiController = CommonController.getInstance();
    }

    updateRequest = (key: string, value: string) => {
        let regRequest = this.state.regRequest;
        regRequest[key] = value;
        this.setState({regRequest: regRequest});
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
        this.setState({confirmPassword: event.target.value});
    };

    checkEmailAvailability = () => {
        this.apiController.checkEmailAvailability(this.state.regRequest.email).then(() => {
            this.setState({emailOK : true});
        }).catch(() => {
            this.setState({emailOK : false});
        });
    };

    checkUserNameAvailability = () => {
        this.apiController.checkUserNameAvailability(this.state.regRequest.username).then(() => {
            this.setState({usernameOK : true});
        }).catch(() => {
            this.setState({usernameOK : false});
        });
    };


    submit = () => {
        if (this.state.regRequest.password != this.state.confirmPassword) {
            this.setState({passwordError: 'Password not matched'});
            return;
        }
        this.apiController.registerUser(this.state.regRequest).then(res => {
            this.apiController.setToken(res.data.token);
            RouterController.history.push(Routes.login);
        }).catch(err => {
            console.log(err.response.data.error);
            this.setState({error: err.response.data.error});
        })
    };

    render() {
        let width = {width: "100%"};
        return (
            <Grid container style={{height: 500, width: 450, padding: 20}} justify="center" align="center">
                <Grid item style={{...width, color: "#aaa"}}>
                    <Typography type="display1" color="secondary">
                        Create an account
                    </Typography>
                    <Typography type="body1" color="inherit">
                        The email will be used as part of your login credentials, and your username will be
                        the displayed name.
                    </Typography>
                </Grid>
                <Grid item style={width}>
                    <ErrorView errorTxt={this.state.error}/>
                    { !this.state.emailOK &&
                        <div style={{color: "red"}}>
                            <Typography type="body1" color="inherit">
                                Sorry, this email is assigned to another account.
                            </Typography>
                        </div>
                    }
                    <TextField
                        label="Email"
                        onChange={this.updateEmail}
                        inputProps={EmailNameInputStyles}
                        style={width}
                        onBlur={this.checkEmailAvailability}
                    />
                </Grid>
                <Grid item style={width}>
                    { !this.state.usernameOK &&
                    <div style={{color: "red"}}>
                        <Typography type="body1" color="inherit">
                            Sorry, this username is being used.
                        </Typography>
                    </div>
                    }
                    <TextField
                        label="Username"
                        onChange={this.updateUsername}
                        style={width}
                        onBlur={this.checkUserNameAvailability}
                    /><br/>
                </Grid>
                <Grid item style={width}>
                    <TextField
                        error={!!this.state.passwordError}
                        label="password"
                        type="password"
                        onChange={this.updatePassword}
                        style={width}
                    /><br/>
                </Grid>
                <Grid item style={width}>
                    <TextField
                        label="confirm password"
                        type="password"
                        onChange={this.updateConfirmPassword}
                        style={width}
                    />
                </Grid>
                <Grid item>
                    <div>
                        <Button raised color="primary" onClick={this.submit}>Submit</Button>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export const RegistrationPage = connect(
    (state: AppStoreState) => ({loggedIn: state.auth.loggedIn}),
    (dispatch) => ({})
)(RegistrationForm);