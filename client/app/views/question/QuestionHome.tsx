import * as React from "react";
import {Component} from "react";
import {Routes} from "../../constants/Routes";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {QuestionHomeReducerState} from "../../reducers/QuestionHomeReducer";
import {ErrorReducerState} from "../../reducers/ErrorReducer";
import AnimatedWrapper from "../../components/Animations/AnimatedWrapper";
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from "material-ui/Card";
import {CustomLink} from "../../components/CustomLink";
import Button from "material-ui/Button";
import {QuestionPreviewCardsComponent} from "./subcomponents/QuestionPreviewCardsComponent";
import Grid from "material-ui/Grid";
import {LoadingScreen} from "../../components/Animations/LoadingScreen";

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
        if (this.props.featuredQuestions.length == 0) {
            return <LoadingScreen/>
        }
        return (
            <Grid container justify="center" >
                <Grid item xs={12} style={{maxWidth: 1620}}>
                    <Grid container justify="flex-end" style={{width: "100%"}}>
                        <Grid item>
                            {this.createQuestionButton()}
                        </Grid>
                    </Grid>
                    <QuestionPreviewCardsComponent list={this.props.featuredQuestions}
                                                   label="Featured" trim={true} maxWidth={1620}/>
                    <QuestionPreviewCardsComponent list={this.props.myQuestions} label="My Questions" maxWidth={1620}/>
                </Grid>
            </Grid>
        )
    }
}

export const QuestionHomePage = AnimatedWrapper(connect(
    (state: AppStoreState) => ({
        loggedIn: state.auth.loggedIn,
        globalError: state.errors,
        ...state.questionHome
    }),
    (dispatch) => ({
        fetchQuestion: () => dispatch(QuestionActions.getQuestionPreviews())
    })
)(QuestionHomeComponent));