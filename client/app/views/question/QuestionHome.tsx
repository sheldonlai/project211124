import * as React from "react";
import {Component} from "react";
import {Routes} from "../../constants/Routes";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {QuestionHomeReducerState} from "../../reducers/QuestionHomeReducer";
import {ErrorReducerState} from "../../reducers/ErrorReducer";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from "material-ui/Card";
import {CustomLink} from "../../components/CustomLink";
import Button from "material-ui/Button";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import {QuestionPreviewCardsComponent} from "./subcomponents/QuestionPreviewCardsComponent";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;

export interface QuestionViewProps extends QuestionHomeReducerState {
    loggedIn: boolean;
    globalError: ErrorReducerState;
    fetchQuestion: () => void;
}

class QuestionHomeComponent extends Component<QuestionViewProps> {
    componentWillMount() {
        console.log(this.props);
        if ((this.props.featuredQuestions.length === 0 || this.props.lastUpdated - Date.now() > 300000))
            this.props.fetchQuestion()
    }

    createQuestionButton = () => {
        if (this.props.loggedIn)
            return <CustomLink to={Routes.createQuestion}><Button raised color="primary">Make new question</Button></CustomLink>;
        return undefined;
    };

    render() {
        return (
            <div>
                {this.createQuestionButton()}
                <QuestionPreviewCardsComponent list={this.props.featuredQuestions} />
            </div>
        )
    }
}

export const QuestionHomePage = AnimatedWrapper(connect(
    (state: AppStoreState) => ({
        loggedIn: state.auth.loggedIn,
        globalError: state.errors,
        ...state.question
    }),
    (dispatch) => ({
        fetchQuestion: () => dispatch(QuestionActions.getQuestionPreviews())
    })
)(QuestionHomeComponent));