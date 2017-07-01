import * as React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import {Routes} from "../../constants/Routes";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {QuestionHomeReducerState} from "../../reducers/QuestionHomeReducer";
import {ErrorReducerState} from "../../reducers/ErrorReducer";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;

export interface QuestionViewProps extends QuestionHomeReducerState {
    loggedIn : boolean;
    globalError: ErrorReducerState;
    fetchQuestion: () => void;
}

class QuestionView extends Component<QuestionViewProps, any> {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        console.log(this.props);
        if ((this.props.featuredQuestions.length === 0 || this.props.lastUpdated - Date.now() > 300000))
            this.props.fetchQuestion()
    }

    featuredQuestions = () => {
        return this.props.featuredQuestions?
            this.props.featuredQuestions.map( (e: QuestionPreview) => (
                <div key={e.title}>
                    <h2>{e.title}</h2>
                    <p>{e.content}</p>
                    <p>{e.createdUtc}</p>
                </div>
            )) : undefined;
    };

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
        globalError: state.errors,
        ...state.question
    }),
    (dispatch) => ({
        fetchQuestion: () => dispatch(QuestionActions.getQuestionPreviews())
    })
)(QuestionView);