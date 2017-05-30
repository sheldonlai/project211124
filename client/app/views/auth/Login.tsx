import * as React from 'react';
import {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export interface LoginViewProps {
    login: () => void;

}

export class LoginView extends Component<any, any> {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div style={{display : 'table', verticalAlign: 'middle', textAlign: 'center', width : '100%'}}>
                <div style={{display : 'table-cell'}}>
                    <Paper style={{width : 560, margin : '50px auto', padding: '50px'}}>
                        <TextField
                            floatingLabelText="username"
                            hintText="username"
                        /><br/>
                        <TextField
                            floatingLabelText="password"
                            hintText="password"
                            type="password"
                        /><br />
                        <RaisedButton primary={true} label="login"/>
                    </Paper>
                </div>
            </div>
        )
    }

}