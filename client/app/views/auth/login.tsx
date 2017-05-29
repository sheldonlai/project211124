import * as React from 'react';
import {Component} from 'react';

export interface LoginViewProps {
    login: () => void;

}

export class LoginView extends Component<any, any> {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>

            </div>
        )
    }

}