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
import {CommentsComponent} from "./subcomponents/CommentsComponent"
import {CommentDto} from "../../../../server/dtos/q&a/CommentDto";
import cloneQuestion = FrontEndQuestionModels.cloneQuestion;


export interface QuestionPageProps extends StateToProps, DispatchToProps, RouteComponentProps<{ id: string }> {}

export interface QuestionPageState {
    editQuestion: boolean;
    editAnswer: boolean;
    answerId: string;
    editComment: boolean;
    commentId: string;
    loading: boolean;
    questionPage: QuestionPage;
}

export class QuestionPageComponent extends React.Component<QuestionPageProps, QuestionPageState> {

    apiController: QuestionAPIController;

    constructor(props) {
        super(props);

        this.state = {
            editQuestion: false,
            editAnswer: false,
            answerId: undefined,
            editComment: false,
            commentId: undefined,
            loading: false,
            questionPage: this.props.questionPage ? cloneQuestionPage(this.props.questionPage) : undefined
        };
        this.apiController = QuestionAPIController.getInstance();
    }

    componentWillMount() {
        if (
            isNullOrUndefined(this.props.questionPage) ||
            this.props.questionPage.question._id !== this.props.match.params.id ||
            Date.now() - this.props.lastUpdated  > 5000
        ) {
            this.resetStates();
            this.props.fetchQuestionPage(this.props.match.params.id);
        }
    }

    componentWillReceiveProps(nextProps: QuestionPageProps) {
        if (nextProps.questionPage != this.props.questionPage) {
            this.resetStates();
            this.setState({questionPage: nextProps.questionPage ? cloneQuestionPage(nextProps.questionPage) : undefined});
        } else if (JSON.stringify(nextProps.questionPage.question) !== JSON.stringify(this.props.questionPage.question)) {
            this.setState({editQuestion: false, questionPage: cloneQuestionPage(nextProps.questionPage)});
        } else if (nextProps.questionPage.answers != this.props.questionPage.answers) {
            this.setState({editAnswer: false, questionPage: cloneQuestionPage(nextProps.questionPage)});
        }
    }

    componentWillUnmount() {
        this.setState({questionPage: this.props.questionPage});
    }

    resetStates = () => {
        this.setState({
            editQuestion: false,
            editAnswer: false,
            answerId: undefined,
            editComment: false,
            commentId: undefined,
            loading: false,
        });
    };

    addAnswer = () => {
        let temp_questionPage = this.state.questionPage;
        temp_questionPage.answers.push(new Answer(temp_questionPage.question._id, this.props.user));
        this.setState({editAnswer: true, questionPage: temp_questionPage});
    };


    submitAnswer = (answer: Answer) => {
        if (answer._id) {
            this.props.editAnswer(answer);
        } else {
            this.props.addAnswer(answer);
        }
    };

    onAnswersChange = (answers: Answer[]) => {
        let temp: QuestionPage = this.state.questionPage;
        temp.answers = answers;
        this.setState({questionPage: temp});
    };

    resetAnswers = () => {
        let questionPage = this.state.questionPage;
        questionPage.answers = this.props.questionPage.answers.map(ans=>ans);
        this.setState({questionPage});
    };

    onCommentSubmit = (comments: CommentDto[]) => {
        this.props.questionPage.question.comments = comments;
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
                <Prompt
                    when={this.state.editAnswer || this.state.editQuestion || this.state.editComment}
                    message={location => (
                        `All unsaved changes will be discarded. Are you sure you want to leave?`
                    )}
                />
                <QuestionBoxView/>
                <AnswerBoxesView/>
            </div>
        );
    }
}

interface StateToProps extends QuestionPageReducerState{
    loggedIn: boolean;
    user: UserDto;
}

interface DispatchToProps {
    fetchQuestionPage: (title: string) => void;
    editAnswer: (answer: Answer) => void;
    addAnswer: (answer: Answer) => void;
    newError: (message: string) => void;
}

export const QuestionPageView = AnimatedWrapper(connect<StateToProps, DispatchToProps, RouteComponentProps<{ id: string }>>(
    (state: AppStoreState) => ({
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
        ...state.questionPage
    }),
    (dispatch) => ({
        fetchQuestionPage: (title: string) => dispatch(QuestionActions.fetchQuestionPage(title)),
        editAnswer: (answer: Answer) => dispatch(AnswerActions.updateAnswer(answer)),
        addAnswer: (answer: Answer) => dispatch(AnswerActions.createAnswer(answer)),
        newError: (message: string) => dispatch(QuestionActions.addError(message)),
    })
)(QuestionPageComponent));