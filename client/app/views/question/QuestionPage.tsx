/**
 * Created by SHELDON on 6/24/2017.
 */
import * as React from "react";
import {ChangeEvent} from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {grey} from "material-ui/styles/colors";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {CommentDto} from "../../../../server/dtos/q&a/CommentDto";
import {Prompt, RouteComponentProps} from "react-router";
import {QuestionPageReducerState} from "../../reducers/QuestionPageReducer";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import {CircularProgress} from "material-ui/Progress";
import AddIcon from "material-ui-icons/Add";
import {isNullOrUndefined} from "util";
import {EditorState} from "draft-js";
import {QAEditorComponent} from "./subcomponents/Q&AEditorComponent";
import {QuestionBoxComponent} from "./subcomponents/QuestionBoxComponent";
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import Answer = FrontEndQuestionModels.Answer;
import cloneQuestionPage = FrontEndQuestionModels.cloneQuestionPage;
import Question = FrontEndQuestionModels.Question;


export interface QuestionPageProps extends QuestionPageReducerState, RouteComponentProps<{ title: string }> {
    user: UserDto
    fetchQuestionPage: (title: string) => any;
    changeQuestionPage: (questionPage: QuestionPage) => any;
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

    constructor(props) {
        super(props);

        this.state = {
            editQuestion: false,
            editAnswer: false,
            answerId: undefined,
            editComment: false,
            commentId: undefined,
            loading: false,
            questionPage: this.props.questionPage? cloneQuestionPage(this.props.questionPage): undefined
        }
    }

    componentWillMount() {
        if (
            isNullOrUndefined(this.props.questionPage) ||
            this.props.questionPage.question.title !== this.props.match.params.title ||
            this.props.lastUpdated - Date.now() > 15000
        ) {
            this.resetStates();
            this.props.fetchQuestionPage(this.props.match.params.title);
        }
    }

    componentWillReceiveProps(nextProps: QuestionPageProps) {
        if (nextProps.questionPage != this.props.questionPage) {
            this.resetStates();
            this.setState({questionPage: nextProps.questionPage? cloneQuestionPage(nextProps.questionPage): undefined});
        }
    }

    componentWillUnmount(){
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
        let temp: QuestionPage = {...this.state.questionPage};
        temp.question = question;
        this.setState({questionPage:temp});
    };

    onAnswerChange = (editorState: EditorState) => {
        let temp: QuestionPage = this.state.questionPage;
        temp.answers = temp.answers.map((state) => {
            state.content = (this.state.answerId === state._id)? editorState: state.content;
            return state;
        });
        this.setState({questionPage:temp});
    };

    submit = () => {

    };

    editPost = () => {
        if (!this.state.editQuestion)
            this.setState({editQuestion: true});
    };
    submitPost = () => {
        this.setState({loading: true});
        // update post
    };

    addAnswer = () => {
        let temp_questionPage = this.state.questionPage;
        temp_questionPage.answers.push(new Answer(temp_questionPage.question._id, this.props.user));
        this.setState({editAnswer: true, questionPage:temp_questionPage});

    };


    submitStudentAnswer = () => {
        let temp = this.state.questionPage;
        this.setState({loading: true});
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

    getEditor = (value: EditorState, onChange: (state: EditorState) => any,
                 onSubmit: () => any, readOnly:boolean =false) =>
        (<QAEditorComponent value={value} onChange={onChange} onSubmit={onSubmit} readOnly={readOnly} />);

    getAnswerContent = (ans: Answer) => {
        return (
            <div>
                this.getEditor(ans.content, this.onAnswerChange, this.submitStudentAnswer, true);
                <Divider />
                {this.getFooterPostedBy(new Date(ans.createdUtc).toLocaleString(), ans.author)}
            </div>
        );
    };

    getAnswersContent = () => {
        let list = [];
        for (let ans of this.state.questionPage.answers) {
            let content;
            let editButton = undefined;
            if (this.props.user.username != ans.author.username)
                editButton = <Button raised onClick={this.addAnswer} style={{float: "right"}}>Edit</Button>;
            if (this.state.editAnswer) {
                content = this.getEditor(ans.content, this.onAnswerChange, this.submitStudentAnswer);
            } else if (ans != null) {
                content = this.getAnswerContent(ans);
            }
            list.push(
                <Paper key={ans._id} style={paperStyle}>
                    <div>{editButton}</div>
                    {content}
                </Paper>
            );
        }
        if (this.props.user != undefined && !this.state.editAnswer) {
            list.push(
                <div key="edit-answer-button" style={{float: 'right', marginTop: 5}}>
                    <Button fab onClick={this.addAnswer}>
                        <AddIcon/>
                    </Button>
                </div>
            )
        }
        return list;
    };

    editComment = (index?: number) => {
    };

    generateNewComment = (): CommentDto => {
        return {
            commentBy: this.props.user,
            commentContent: '',
            lastEditedUtc: undefined
        };
    };

    onCommentTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    };

    onCommentSubmit = () => {
    };


    render(){
        if (this.state.questionPage == null) {
            return (
                <div style={{height: "100%", margin: 10, padding: "200px 0px", textAlign: "center"}}>
                    <CircularProgress
                        size={150}
                        style={{display: 'inline-block', position: 'relative'}}
                    />
                </div>
            )
        }
        let answers = this.getAnswersContent();
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
                                      onSubmit={this.submitPost}
                                      onEditClick={this.editPost}
                                      editMode={this.state.editQuestion}
                                      user={this.props.user}
                />
                {answers}
            </div>
        );
    }
}

export const QuestionPageView = AnimatedWrapper(connect(
    (state: AppStoreState) => ({
        user: state.auth.user,
        ...state.questionPage
    }),
    (dispatch) => ({
        fetchQuestionPage: (title: string) => dispatch(QuestionActions.fetchQuestionPage(title)),
        changeQuestionPage: (questionPage: QuestionPage) => dispatch(QuestionActions.changeQuestionPage(questionPage))
    })
)(QuestionPageComponent));