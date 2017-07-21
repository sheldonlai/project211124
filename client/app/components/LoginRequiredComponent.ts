import {Component} from 'react';
import * as React from 'react';
import {RouterController} from "../api.controllers/RouterController";
import {Routes} from "../constants/Routes";

export interface LoginRequiredComponentProps {
    loggedIn : boolean;
}

export class LoginRequiredComponent<P extends LoginRequiredComponentProps, S> extends Component<P, S>{

    constructor(props) {
        super(props);
        if (!this.props.loggedIn){
            RouterController.history.goBack();
        }
    }

    componentWillMount(){
        if (!this.props.loggedIn) {
            RouterController.history.push(Routes.home);
        }
    }

    componentWillReceiveProps(nextProps){
        if (!this.props.loggedIn){
            RouterController.history.goBack();
        }
    }
}