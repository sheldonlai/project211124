
import * as React from 'react';
import {Component} from 'react';
import {Container} from 'flux/utils';
import {QuestionView} from '../views/question/QuestionView';
import {QuestionState, QuestionStore} from '../stores/QuestionStore';

export interface QuestionContainerProps extends QuestionState{

}

class QuestionContainer extends Component<any, QuestionContainerProps> {

    static getStores () {
        return [QuestionStore];
    }

    static calculateState(){
        return QuestionStore.getState();
    }

    render() {
        return (
            <QuestionView {...this.state}/>
        )
    }

}

export const QuestionViewContainer = Container.create(QuestionContainer);