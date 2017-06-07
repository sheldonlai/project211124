import {Component} from 'react';
import {Link} from 'react-router-dom';
import {Routes} from '../../constants/Routes';
import * as React from 'react';

export class QuestionView extends Component<any, any> {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Link to={Routes.createQuestion}>Make new question</Link>
            </div>
        )
    }
}