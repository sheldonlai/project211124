import * as React from 'react';
import {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {AuthActions} from '../../actions/AuthActions';
import {LoginRequest} from '../../models/LoginRequest';
import {Link} from 'react-router-dom';
import {Routes} from '../../constants/Routes';

export interface LoginViewState {
    loginRequest : LoginRequest;
}



export class LoginView extends Component<any, any> {

    constructor(props){
        super(props);
    }

    updateUsername(event) {
        let  loginReq : LoginRequest = this.state.loginRequest;
        loginReq.email = event.target.value;
        this.setState(loginReq);
    }

    updatePassword(event) {
        let loginReq : LoginRequest = this.state.loginRequest;
        loginReq.password = event.target.value;
        this.setState(loginReq);
    }


    submit = () => {
        AuthActions.login(this.state.loginRequest)
    }

    render(){
        return (
            <div style={{display : 'table', verticalAlign: 'middle', textAlign: 'center', width : '100%'}}>
                <div style={{display : 'table-cell'}}>
                    <Paper style={{width : 560, margin : '50px auto', padding: '50px'}}>
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
                        <p>Don't have an account? <Link to={Routes.registration}>Register Here</Link></p>
                        <RaisedButton primary={true} label="login" onTouchTap={this.submit}/>
                    </Paper>
                </div>
            </div>
        )
    }

}