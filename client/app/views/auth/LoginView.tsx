import * as React from "react";
import {Component} from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import {AuthActions} from "../../actions/AuthActions";
import {Link} from "react-router-dom";
import {Routes} from "../../constants/Routes";
import {FormWrapper} from "../../components/FormWrapper";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import AnimatedWrapper from "../../components/Animations/AnimatedWrapper";
import {FrontEndAuthModels} from "../../models/AuthModels";
import LoginRequest = FrontEndAuthModels.LoginRequest;
import {EmailNameInputStyles} from "../../constants/StyleClasses";

export interface LoginViewState {
    loginRequest: LoginRequest;
}

export class LoginView extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            loginRequest: new LoginRequest()
        };
    }

    updateEmail = (event) => {
        let loginReq: LoginRequest = this.state.loginRequest;
        loginReq.email = event.target.value;
        this.setState(loginReq);
    };

    updatePassword = (event) => {
        let loginReq: LoginRequest = this.state.loginRequest;
        loginReq.password = event.target.value;
        this.setState(loginReq);
    };

    submit = () => {
        this.props.login(this.state.loginRequest)
    };

    render() {
        return (
            <FormWrapper>
                <TextField
                    label="email"
                    onChange={this.updateEmail}
                    inputProps={EmailNameInputStyles}
                /><br/>
                <TextField
                    label="password"
                    type="password"
                    onChange={this.updatePassword}
                /><br />
                <p style={{fontSize : 12}}>
                    Don't have an account?
                    <Link to={Routes.registration}
                          style={{textDecoration: 'None', color : 'blue'}}>
                        Register Here
                    </Link>
                </p>
                <Button raised color="primary" onClick={this.submit}>login</Button>
            </FormWrapper>
        )
    }
}

export const LoginPage = AnimatedWrapper(connect(
    (state : AppStoreState) => ({loggedIn : state.auth.loggedIn}),
    (dispatch) => ({login : (login: LoginRequest) => dispatch(AuthActions.login(login))})
)(LoginView));