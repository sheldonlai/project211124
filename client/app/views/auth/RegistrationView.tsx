import * as React from 'react';
import {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

export class RegistrationView extends Component<any, any>{


    render(){
        return <div style={{textAlign: 'center'}}>
            <Paper>
                <TextField
                    floatingLabelText="username"
                    hintText="username"
                /><br />
                <TextField
                    floatingLabelText="username"
                    hintText="username"
                /><br/>
                <TextField
                    floatingLabelText="password"
                    hintText="password"
                    type="password"

                /><br />
                <TextField
                    floatingLabelText="Confirm password"
                    hintText="Confirm Password"
                    type="password"
                />
            </Paper>
        </div>
    }
}