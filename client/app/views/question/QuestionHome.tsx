import * as React from "react";
import {Component} from "react";
import {Routes} from "../../constants/Routes";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {QuestionHomeReducerState} from "../../reducers/QuestionHomeReducer";
import {ErrorReducerState} from "../../reducers/ErrorReducer";
import {CardText, CardTitle} from "material-ui/Card";
import {CustomLink} from "../../components/RoutingComponents/CustomLink";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import {LoadingScreen} from "../../components/Animations/LoadingScreen";
import Typography from "material-ui/Typography";
import {PreviewCardsComponent} from "../../components/CardComponent/PreviewCardsComponent";

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

    mainContent = () => {
        if (this.props.featuredQuestions.length < 1 && this.props.myQuestions.length < 1) {
            return <Grid container justify="center">
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Typography type="headline">
                        There are currently no ratings available.
                    </Typography>
                </Grid>
                <Grid item style={{textAlign: "center"}}>
                    {
                        !this.props.loggedIn &&
                        <Typography type="body1" color="inherit" style={{color: "#aaa"}}>
                            Please log in to make a write about a teammate.
                        </Typography>
                    }
                </Grid>
            </Grid>
        } else {
            return <Grid container justify="center">
                <Grid item xs={12} style={{maxWidth: 1082}}>
                    <Grid container justify="flex-end" style={{width: "100%"}}>
                        <Grid item>
                            {this.createQuestionButton()}
                        </Grid>
                    </Grid>
                    <PreviewCardsComponent list={this.props.featuredQuestions} maxRow={2}
                                           label="Featured" trim={false} maxBlock={4}/>
                    <PreviewCardsComponent list={this.props.myQuestions} maxRow={2}
                                           label="My Questions" maxBlock={4}/>
                </Grid>
            </Grid>
        }
    };


    render() {
        if (this.props.featuredQuestions.length == 0) {
            return <LoadingScreen/>
        }
        return this.mainContent();
    }
}

export const QuestionHomePage = connect(
    (state: AppStoreState) => ({
        loggedIn: state.auth.loggedIn,
        globalError: state.errors,
        ...state.questionHome
    }),
    (dispatch) => ({
        fetchQuestion: () => dispatch(QuestionActions.getQuestionPreviews())
    })
)(QuestionHomeComponent);