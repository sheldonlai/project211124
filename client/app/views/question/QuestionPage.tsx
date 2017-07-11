/**
 * Created by SHELDON on 6/24/2017.
 */
import * as React from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {Prompt, RouteComponentProps} from "react-router";
import {QuestionPageReducerState} from "../../reducers/QuestionPageReducer";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import {CircularProgress} from "material-ui/Progress";
import {isNullOrUndefined} from "util";
import {QuestionBoxComponent, QuestionBoxView} from "./subcomponents/QuestionBoxComponent";
import {AnswerActions} from "../../actions/AnswerActions";
import {QuestionAPIController} from "../../api.controllers/QuestionAPIController";
import {AnswerBoxesComponent, AnswerBoxesView} from "./subcomponents/AnswerBoxesComponent";
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import Answer = FrontEndQuestionModels.Answer;
import cloneQuestionPage = FrontEndQuestionModels.cloneQuestionPage;
import Question = FrontEndQuestionModels.Question;
import cloneQuestion = FrontEndQuestionModels.cloneQuestion;


export interface QuestionPageProps extends StateToProps, DispatchToProps, RouteComponentProps<{ id: string }> {}

export interface QuestionPageState {}

export class QuestionPageComponent extends React.Component<QuestionPageProps, QuestionPageState> {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.lastUpdated || Date.now() - this.props.lastUpdated  > 5000) {
            this.props.fetchQuestionPage(this.props.match.params.id);
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
                <QuestionBoxView/>
                <AnswerBoxesView/>
            </div>
        );
    }
}

interface StateToProps{
    status: ReducerStateStatus;
    lastUpdated: number;
}

interface DispatchToProps {
    fetchQuestionPage: (title: string) => void;
    newError: (message: string) => void;
}

export const QuestionPageView = AnimatedWrapper(connect<StateToProps, DispatchToProps, RouteComponentProps<{ id: string }>>(
    (state: AppStoreState) => ({
        status : state.questionPage.status,
        lastUpdated: state.questionPage.lastUpdated
    }),
    (dispatch) => ({
        fetchQuestionPage: (id: string) => dispatch(QuestionActions.fetchQuestionPage(id)),
        newError: (message: string) => dispatch(QuestionActions.addError(message)),
    })
)(QuestionPageComponent));