import {Component} from 'react';
import * as React from 'react';

export interface ErrorViewProps {
    errorTxt: string;
}

export class ErrorView extends Component<ErrorViewProps, any> {

    render() {
        if (this.props.errorTxt){
            return (
                <div>
                    <p style={{color : 'red', fontSize : 14}}>
                        {this.props.errorTxt}
                    </p>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }

    }

}