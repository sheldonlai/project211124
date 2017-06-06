
import * as React from 'react';
import {Component} from 'react';
import {Container} from 'flux/utils';
import {QuestionView} from '../views/question/Question';
import AuthStore, {AuthStoreState} from '../stores/AuthStore';

export interface QuestionContainerProps extends AuthStoreState{

}

class QuestionContainer extends Component<any, QuestionContainerProps> {

    static getStores () {
        return [AuthStore];
    }

    static calculateState(){
        return AuthStore.getState();
    }

    render() {
        return (
            <QuestionView {...this.state}/>
        )
    }

}

export const QuestionViewContainer = Container.create(QuestionContainer);