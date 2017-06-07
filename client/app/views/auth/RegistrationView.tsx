import * as React from 'react';
import {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {RegistrationRequest} from '../../models/RegistrationRequest';
import {FormWrapper} from '../../components/FormWrapper';
import {AuthActions} from '../../actions/AuthActions';
import {ErrorView} from '../../components/ErrorView';
import RaisedButton from 'material-ui/RaisedButton';

export interface RegistrationViewState {
    regRequest : RegistrationRequest;
    confirmPassword : string;
    passwordError  : string;
}

export class RegistrationView extends Component<any, RegistrationViewState>{

    constructor (props) {
        super(props);
        this.state = {
            regRequest : new RegistrationRequest(),
            confirmPassword : '',
            passwordError : ''
        }
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
        this.updateRequest('username', event.target.value);
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
        AuthActions.register(this.state.regRequest)
    }

    render(){
        return (
            <FormWrapper>
                <ErrorView errorTxt={this.props.error}/>
                <TextField
                    floatingLabelText="username"
                    hintText="username"
                    onChange={this.updateUsername}
                /><br />
                <TextField
                    floatingLabelText="email"
                    hintText="email"
                    onChange={this.updateEmail}
                /><br/>
                <ErrorView errorTxt={this.props.error}/>
                <TextField
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