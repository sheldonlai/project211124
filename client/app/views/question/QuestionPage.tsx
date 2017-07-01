/**
 * Created by SHELDON on 6/24/2017.
 */
import * as React from "react";
import {ChangeEvent} from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {grey300, grey800} from "material-ui/styles/colors";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {CommentDto} from "../../../../server/dtos/q&a/CommentDto";
import {Prompt, RouteComponentProps} from "react-router";
import {QuestionPageReducerState} from "../../reducers/QuestionPageReducer";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import {CircularProgress} from "material-ui/Progress";
import AddIcon from "material-ui-icons/Add";
import {CustomEditor} from "../../components/CustomEditor/CustomEditor";
import {isNullOrUndefined} from "util";
import {EditorState} from "draft-js";
import QuestionPage = FrontEndQuestionModels.QuestionPage;
import Answer = FrontEndQuestionModels.Answer;


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

let headerStyle = {
    margin: "10px 0px",
    display: "inline-block"
};

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
            questionPage: this.props.questionPage
        }
    }

    componentWillMount() {
        console.log(this.props, this.state);
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
            this.setState({questionPage: nextProps.questionPage});
        }
    }

    titleChange = (event: any, value: string) => {

    };

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


    onQuestionTitleChange = (event: any, value: string) => {
        let temp: QuestionPage = this.state.questionPage;
        temp.question.title = value;
        this.setState({questionPage:temp});
    };
    onQuestionContentChange = (text: any) => {
        let temp: QuestionPage = this.state.questionPage;
        temp.question.content = text;
        this.setState({questionPage:temp});
    };
    onAnswerChange = (editorState: EditorState) => {
        let temp: QuestionPage = this.state.questionPage;
        temp.answers = temp.answers.map((state) => {
            state.content = (this.state.answerId === state._id)? editorState: state.content;
            return state;
        })
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
        let questionPage = this.state.questionPage;
        questionPage.answers.push(new Answer(questionPage.question, this.props.user));
        this.setState({editAnswer: true, questionPage:questionPage});

    };


    submitStudentAnswer = () => {
        let temp = this.state.questionPage;
        this.setState({loading: true});
        // add Answer
        // update Answer
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

    getEditor = (value: EditorState, onChange: (state: EditorState) => any, onSubmit: () => any, readOnly:boolean =false) => {
        const button = (
            <div style={{textAlign: "right"}}>
                <Button raised  onClick={onSubmit}>save</Button>
            </div>
        );

        return (
            <div style={{marginBottom: 15}}>
                    <CustomEditor value={value} onChange={onChange} readOnly={readOnly}/>
                    {!readOnly && button}
            </div>
        )
    };

    getAnswerContent = (ans: Answer) => {
        return (
            <div>
                this.getEditor(ans.content, this.onAnswerChange, this.submitStudentAnswer, true);
                <Divider />
                {this.getFooterPostedBy(new Date(ans.createdUtc).toLocaleString(), ans.author)}
            </div>
        );
    };

    getQuestionContent = () => {
        let question = this.state.questionPage.question;
        let editBut = ( this.props.user && question.author.username == this.props.user.username && !this.state.editQuestion) ?
            <div style={{float: "right"}}>
                <Button raised onClick={this.editPost} style={{float: "right"}}>Edit</Button>
            </div>
            : undefined;
        let title = (!this.state.editQuestion) ?
            (<div>
                <h3 style={headerStyle}>{question.title}</h3>
                {editBut}
            </div>)
            : (<div>
                <TextField
                    hintText="Title"
                    floatingLabelText="Title"
                    fullWidth={true}
                    value={question.title}
                    onChange={this.onQuestionTitleChange}
                />
            </div>);
        let content;
        if (this.state.editQuestion) {
            content = this.getEditor(this.state.questionPage.question.content, this.onQuestionContentChange, this.submitPost);
        } else {
            let tags = (this.state.questionPage.question.tags != null) ?
                this.state.questionPage.question.tags.map((name: string, index) => {
                    return <span style={{fontSize: 14, color: grey800, backgroundColor: grey300, padding: 4, margin: 4}}
                                 key={name+index}
                    >
                        {name}
                    </span>
                }) : null;
            content =
                <div>
                    {this.getEditor(question.content, this.onQuestionContentChange, this.submitPost, true)}
                    <div style={{height: 24}}>
                        {tags}
                    </div>
                    <Divider />
                    {this.getFooterPostedBy(new Date(question.createdUtc).toLocaleString(), question.author.username)}
                </div>
        }
        return (
            <Paper style={paperStyle}>
                {title}
                <Divider />
                {content}
            </Paper>
        );
    };

    getAnswersContent = () => {
        let list = [];
        for (let ans of this.state.questionPage.answers) {
            let content;

            let editButton = undefined;
            if (this.props.user.username != ans.author.username)
                editButton = <Button raised label="Edit" onClick={this.addAnswer} style={{float: "right"}}/>;
            if (this.state.editAnswer) {
                editButton = null;
                content = this.getEditor(ans.content, this.onAnswerChange, this.submitStudentAnswer);
            } else if (ans != null) {
                content = this.getAnswerContent(ans);
            }
            console.log(editButton, content);
            list.push(
                <Paper key={ans._id + ans.author} style={paperStyle}>
                    <div>
                        {editButton}
                    </div>
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
                    {/*<CircularProgress*/}
                        {/*size={150}*/}
                        {/*style={{display: 'inline-block', position: 'relative'}}*/}
                    {/*/>*/}
                </div>
            )
        }
        let postDisplay = this.getQuestionContent();
        let answers = this.getAnswersContent();
        return (
            <div style={{padding: 10}}>
                <Prompt
                    when={this.state.editAnswer || this.state.editQuestion || this.state.editComment}
                    message={location => (
                        `All unsaved changes will be discarded. Are you sure you want to leave?`
                    )}
                />
                {postDisplay}
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