import * as React from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {RouteComponentProps} from "react-router";
import {CircularProgress} from "material-ui/Progress";
import {QuestionBoxView} from "./subcomponents/QuestionBoxComponent";
import {AnswerBoxesView} from "./subcomponents/AnswerBoxesComponent";
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import Grid from "material-ui/Grid";
import {QuestionInfoBoxView} from "./subcomponents/QuestionInfoBox";
import Hidden from 'material-ui/Hidden';
import {LoadingScreen} from "../../components/LoadingScreen";
import {CSSTransitionGroup} from "react-transition-group";
interface QuestionPageProps extends StateToProps, DispatchToProps, RouteComponentProps<{ id: string }> {
}

interface QuestionPageState {
}

export class QuestionPageComponent extends React.Component<QuestionPageProps> {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let questionId = this.props.match.params.id;
        if (this.props.questionId != questionId ||
            !this.props.lastUpdated ||
            Date.now() - this.props.lastUpdated > 5000) {
            this.props.fetchQuestionPage(questionId);
        }
    }

    render() {
        if (this.props.status === ReducerStateStatus.LOADING) {
            return (<LoadingScreen/>);
        }
        return (
            <div style={{padding: 10}}>
                <Grid container justify="center" direction="row-reverse">
                    <Grid item xs={12} md={3} lg={2}>
                        <Hidden smDown>
                            <div style={{height: 42}}/>
                        </Hidden>
                        <QuestionInfoBoxView/>
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                        <QuestionBoxView/>
                        <AnswerBoxesView/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

interface StateToProps {
    status: ReducerStateStatus;
    lastUpdated: number;
    questionId: string;
    questionTitle: string;
}

interface DispatchToProps {
    fetchQuestionPage: (title: string) => void;
    newError: (message: string) => void;
}

export const QuestionPageView = connect<StateToProps, DispatchToProps, RouteComponentProps<{ id: string }>>(
    (state: AppStoreState) => {
        let questionId = state.questionPage.questionPage ? state.questionPage.questionPage.question._id : undefined;
        return {
            status: state.questionPage.status,
            lastUpdated: state.questionPage.lastUpdated,
            questionId: questionId,
            questionTitle: (questionId) ? state.questionPage.questionPage.question.title : ""
        }
    },
    (dispatch) => ({
        fetchQuestionPage: (id: string) => dispatch(QuestionActions.fetchQuestionPage(id)),
        newError: (message: string) => dispatch(QuestionActions.addError(message)),
    })
)(QuestionPageComponent);