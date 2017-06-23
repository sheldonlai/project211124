import {Component} from 'react';
import * as React from 'react';
import {RouterController} from "../api.controllers/RouterController";

export interface LoginRequiredComponentProps{
    loggedIn : boolean;
}

export class LoginRequiredComponent<P extends LoginRequiredComponentProps, S> extends Component<P, S>{

    constructor(props) {
        super(props);
        if (!this.props.loggedIn){
            RouterController.history.goBack();
        }
    }

    // componentWillMount(){
    //     if (!this.props.loggedIn){
    //         RouterController.history.goBack();
    //     }
    // }

    componentWillReceiveProps(nextProps){
        if (!this.props.loggedIn){
            RouterController.history.goBack();
        }
    }
}