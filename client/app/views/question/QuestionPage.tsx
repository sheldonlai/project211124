import * as React from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {RouteComponentProps} from "react-router";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import {CircularProgress} from "material-ui/Progress";
import {QuestionBoxView} from "./subcomponents/QuestionBoxComponent";
import {AnswerBoxesView} from "./subcomponents/AnswerBoxesComponent";
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import Grid from "material-ui/Grid";
import {QuestionInfoBoxView} from "./subcomponents/QuestionInfoBox";
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import Answer = FrontEndQuestionModels.Answer;
import cloneQuestionPage = FrontEndQuestionModels.cloneQuestionPage;
import Question = FrontEndQuestionModels.Question;
import cloneQuestion = FrontEndQuestionModels.cloneQuestion;


export interface QuestionPageProps extends StateToProps, DispatchToProps, RouteComponentProps<{ id: string }> {
}

export interface QuestionPageState {
}

export class QuestionPageComponent extends React.Component<QuestionPageProps, QuestionPageState> {

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
            return (
                <div style={{height: "100%", margin: 10, padding: "200px 0px", textAlign: "center"}}>
                    <CircularProgress
                        size={150}
                    />
                </div>
            )
        }
        return (
            <div style={{padding: 10}}>
                <Grid container justify="center" direction="row-reverse">
                    <Grid item xs={12} md={3} lg={2}>
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
}

interface DispatchToProps {
    fetchQuestionPage: (title: string) => void;
    newError: (message: string) => void;
}

export const QuestionPageView = AnimatedWrapper(connect<StateToProps, DispatchToProps, RouteComponentProps<{ id: string }>>(
    (state: AppStoreState) => {
        let questionId = state.questionPage.questionPage? state.questionPage.questionPage.question._id: undefined;
        return {
            status: state.questionPage.status,
            lastUpdated: state.questionPage.lastUpdated,
            questionId: questionId
        }
    },
    (dispatch) => ({
        fetchQuestionPage: (id: string) => dispatch(QuestionActions.fetchQuestionPage(id)),
        newError: (message: string) => dispatch(QuestionActions.addError(message)),
    })
)(QuestionPageComponent));