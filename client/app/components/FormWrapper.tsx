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
                <Paper style={{width : 560, margin : '50px auto', padding: '50px'}}>
                    {this.props.children}
                </Paper>
            </div>
        )
    }
}

