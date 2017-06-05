import * as Reaact from 'react';
import {Component} from 'react';
import * as React from 'react';
import Paper from 'material-ui/Paper';


export class FormWrapper extends Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Paper style={{width : 500, margin: 'auto'}}>
                    {this.props.children}
                </Paper>
            </div>
        )
    }
}

