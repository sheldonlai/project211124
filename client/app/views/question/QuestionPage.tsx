/**
 * Created by SHELDON on 6/24/2017.
 */
import * as React from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {grey} from "material-ui/styles/colors";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {CommentDto} from "../../../../server/dtos/q&a/CommentDto";
import {Prompt, RouteComponentProps} from "react-router";
import {QuestionPageReducerState} from "../../reducers/QuestionPageReducer";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import AnimatedWrapper from "../../components/AnimatedWrapper";
// import {CircularProgress} from "material-ui/Progress";
import {isNullOrUndefined} from "util";
import {EditorState} from "draft-js";
import {QAEditorComponent} from "./subcomponents/Q&AEditorComponent";
import {QuestionBoxComponent} from "./subcomponents/QuestionBoxComponent";
import {AnswerActions} from "../../actions/AnswerActions";
import {QuestionAPIController} from "../../api.controllers/QuestionAPIController";
import {AnswerBoxesComponent} from "./subcomponents/AnswerBoxesComponent";
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import Answer = FrontEndQuestionModels.Answer;
import cloneQuestionPage = FrontEndQuestionModels.cloneQuestionPage;
import Question = FrontEndQuestionModels.Question;


export interface QuestionPageProps extends QuestionPageReducerState, RouteComponentProps<{ id: string }> {
    user: UserDto
    loggedIn: boolean;
    fetchQuestionPage: (title: string) => any;
    editQuestion: (question: Question) => any;
    editAnswer: (answer: Answer) => any;
    addAnswer: (answer: Answer) => any;
    newError: (message: string) => any;
}

export interface QuestionPageState {
    editQuestion: boolean;
    editAnswer: boolean;
    answerId: string;
    editComment: boolean;
    commentId: string;
    loading: boolean;
    questionPage: QuestionPage;
}

let paperStyle = {height: "100%", padding: 15, paddingBottom: 0};


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
            this.props.lastUpdated - Date.now() > 15000
        ) {
            this.resetStates();
            this.props.fetchQuestionPage(this.props.match.params.id);
        }
    }

    componentWillReceiveProps(nextProps: QuestionPageProps) {
        if (nextProps.questionPage != this.props.questionPage) {
            this.resetStates();
            this.setState({questionPage: nextProps.questionPage ? cloneQuestionPage(nextProps.questionPage) : undefined});
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
        })
    };
    onQuestionChange = (question: Question) => {
        let temp: QuestionPage = new QuestionPage();
        temp.answers = this.props.questionPage.answers;
        temp.question = question;
        this.setState({questionPage: temp});
    };

    onAnswerChange = (answer: Answer) => {
        let temp: QuestionPage = this.state.questionPage;
        temp.answers = temp.answers.map((ans) => {
            if (answer._id === ans._id) {
                return answer;
            }
            return ans
        });
        this.setState({questionPage: temp});
    };

    editPost = () => {
        if (!this.state.editQuestion)
            this.setState({editQuestion: true});
    };

    submitQuestion = () => {
        this.setState({loading: true});
        this.apiController.updateQuestion(this.state.questionPage.question).then((res) => {
            this.props.editQuestion(res.data);
            this.setState({editQuestion: false});
            this.props.editQuestion(res.data);
        }).catch((err) => {
            this.props.newError("Unable to update question.");
        })

    };

    addAnswer = () => {
        let temp_questionPage = this.state.questionPage;
        temp_questionPage.answers.push(new Answer(temp_questionPage.question._id, this.props.user));
        this.setState({editAnswer: true, questionPage: temp_questionPage});
    };


    submitAnswer = (answer: Answer) => {
        if (answer._id){
            this.props.editAnswer(answer);
        } else {
            this.props.addAnswer(answer);
        }
    };

    getFooterPostedBy = (date: string, name: string) => {
        return (
            <p style={{color: "grey", fontSize: 10, textAlign: "right"}}>
                Posted on {date}
                <br/>
                by {name}
            </p>
        )
    };

    generateNewComment = (): CommentDto => {
        return {
            commentBy: this.props.user,
            commentContent: '',
            lastEditedUtc: undefined
        };
    };

    onAnswersChange = (answers: Answer[]) => {
        let temp: QuestionPage = this.state.questionPage;
        temp.answers = answers;
        this.setState({questionPage: temp});
    }

    render() {
        if (this.state.questionPage == null) {
            return (
                <div style={{height: "100%", margin: 10, padding: "200px 0px", textAlign: "center"}}>
                    {/*<CircularProgress*/}
                    {/*size={150}*/}
                    {/*style={{display: 'inline-block', position: 'relative'}}*/}
                    {/*/>*/}
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
                <QuestionBoxComponent onQuestionChange={this.onQuestionChange}
                                      question={this.props.questionPage.question}
                                      onSubmit={this.submitQuestion}
                                      onEditClick={this.editPost}
                                      editMode={this.state.editQuestion}
                                      user={this.props.user}
                />

                <AnswerBoxesComponent onAnswersChange={this.onAnswersChange} answers={this.state.questionPage.answers}
                                    user={this.props.user} onSubmit={this.submitAnswer}
                                    question={this.props.questionPage.question}
                />
            </div>
        );
    }
}

export const QuestionPageView = AnimatedWrapper(connect(
    (state: AppStoreState) => ({
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
        ...state.questionPage
    }),
    (dispatch) => ({
        fetchQuestionPage: (title: string) => dispatch(QuestionActions.fetchQuestionPage(title)),
        editQuestion: (question: Question) => dispatch(QuestionActions.updateQuestion(question)),
        editAnswer: (answer: Answer) => dispatch(AnswerActions.updateAnswer(answer)),
        addAnswer: (answer: Answer) => dispatch(AnswerActions.createAnswer(answer)),
        newError: (message: string) => dispatch(QuestionActions.addError(message)),
    })
)(QuestionPageComponent));