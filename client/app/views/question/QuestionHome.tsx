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
import Grid from "material-ui/Grid";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;

export interface QuestionViewProps extends QuestionHomeReducerState {
    loggedIn: boolean;
    globalError: ErrorReducerState;
    fetchQuestion: () => void;
}

class QuestionHomeComponent extends Component<QuestionViewProps> {
    componentWillMount() {
        if ((this.props.featuredQuestions.length === 0 || this.props.lastUpdated - Date.now() < 1000))
            this.props.fetchQuestion()
    }

    createQuestionButton = () => {
        if (this.props.loggedIn)
            return <CustomLink to={Routes.createQuestion}><Button>Make new question</Button></CustomLink>;
        return undefined;
    };

    render() {
        return (
            <Grid container justify="flex-end" style={{width: "100%"}}>
                <Grid>{this.createQuestionButton()}</Grid>
                <QuestionPreviewCardsComponent list={this.props.featuredQuestions} />
            </Grid>
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