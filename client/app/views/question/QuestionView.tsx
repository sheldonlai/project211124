import {Component} from 'react';
import {Link} from 'react-router-dom';
import {Routes} from '../../constants/Routes';
import * as React from 'react';
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {QuestionReducerState} from "../../reducers/QuestionReducer";
import {QuestionPreview} from "../../../../server/dtos/q&a/QuestionPreview";
import {ErrorReducerState} from "../../reducers/ErrorReducer";

export interface QuestionViewProps extends QuestionReducerState {
    loggedIn : boolean;
    globalError: ErrorReducerState;
    fetchQuestion: () => void;
}

class QuestionView extends Component<QuestionViewProps, any> {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        console.log(this.props)
        if ((this.props.featuredQuestions.length === 0 || this.props.lastUpdated - Date.now() > 300000))
            this.props.fetchQuestion()
    }

    featuredQuestions = () => {
        return this.props.featuredQuestions?
            this.props.featuredQuestions.map( (e: QuestionPreview) => (
                <div key={e.title}>
                    <h2>{e.title}</h2>
                    <p>{e.content}</p>
                    <p>{e.dateCreated}</p>
                </div>
            )) : undefined;
    }

    render() {
        return (
            <div>
                <Link to={Routes.createQuestion}>Make new question</Link>
                {this.featuredQuestions()}
            </div>
        )
    }
}

export const QuestionPage = connect(
    (state: AppStoreState) => ({
        loggedIn: state.auth.loggedIn,
        globalError: state.error,
        ...state.question
    }),
    (dispatch) => ({
        fetchQuestion: () => dispatch(QuestionActions.getQuestionPreviews())
    })
)(QuestionView)