import * as React from 'react';
import {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {AuthActions} from '../../actions/AuthActions';
import {LoginRequest} from '../../models/LoginRequest';
import {Link} from 'react-router-dom';
import {Routes} from '../../constants/Routes';
import {FormWrapper} from '../../components/FormWrapper';
import {connect} from "react-redux";

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

    updateUsername = (event) => {
        let loginReq: LoginRequest = this.state.loginRequest;
        loginReq.email = event.target.value;
        this.setState(loginReq);
    }

    updatePassword = (event) => {
        let loginReq: LoginRequest = this.state.loginRequest;
        loginReq.password = event.target.value;
        this.setState(loginReq);
    }

    submit = () => {
        this.props.login(this.state.loginRequest)
    }

    render() {
        return (
            <FormWrapper>
                <TextField
                    floatingLabelText="username"
                    hintText="username"
                    onChange={this.updateUsername}
                /><br/>
                <TextField
                    floatingLabelText="password"
                    hintText="password"
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
                <RaisedButton primary={true} label="login" onTouchTap={this.submit}/>
            </FormWrapper>
        )
    }
}

export const LoginPage = connect(
    state => ({}),
    dispatch => ({login : (login: LoginRequest) => dispatch(AuthActions.login(login))})
)(LoginView)