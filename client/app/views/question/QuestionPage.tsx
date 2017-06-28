/**
 * Created by SHELDON on 6/24/2017.
 */
import * as React from "react";
import {ChangeEvent} from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {grey300, grey800} from "material-ui/styles/colors";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import FloatingActionButton from "material-ui/FloatingActionButton";
import TextField from "material-ui/TextField";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {QuestionPageDto} from "../../../../server/dtos/q&a/QuestionPageDto";
import {AnswerDto} from "../../../../server/dtos/q&a/AnswerDto";
import {CommentDto} from "../../../../server/dtos/q&a/CommentDto";
import {Prompt, RouteComponentProps} from "react-router";
import {QuestionPageReducerState} from "../../reducers/QuestionPageReducer";
import {QuestionPageAnswer} from "../../models/QuestionPageAnswer";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import CircularProgress from "material-ui/CircularProgress";
import Add from 'material-ui/svg-icons/content/add';
import {CustomEditor} from "../../components/CustomEditor";
import {isNullOrUndefined} from "util";

export interface QuestionPageProps extends QuestionPageReducerState, RouteComponentProps<{ title: string }> {
    user: UserDto
    fetchQuestionPage: (title: string) => any;
    changeQuestionPage: (questionPage: QuestionPageDto) => any;
}

export interface QuestionPageState {
    editQuestion: boolean;
    editAnswer: boolean;
    answerId: string;
    editComment: boolean;
    commentId: string;
    loading: boolean;
    questionPage: QuestionPageDto;
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
        let temp: QuestionPageDto = this.state.questionPage;
        temp.question.title = value;
        this.setState({questionPage:temp});
    };
    onQuestionContentChange = (text: string) => {
        let temp: QuestionPageDto = this.state.questionPage;
        temp.question.content = text;
        this.setState({questionPage:temp});
    };
    onAnswerChange = (text: string) => {
        let temp: QuestionPageDto = this.state.questionPage;
        temp.answers.map((answer: AnswerDto) => {
            if (answer._id === this.state.answerId) {
                answer.content = text;
            }
            return answer;
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
        let questionPage = this.state.questionPage;
        questionPage.answers.push(new QuestionPageAnswer(questionPage.question, this.props.user));
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

    getEditor = (value: string, onChange: (text: string) => any, onSubmit: () => any) => {
        return (
            <div style={{marginBottom: 15}}>
                    <CustomEditor value={value} onChange={onChange}/>
                <div style={{textAlign: "right"}}>
                    <RaisedButton label="save" onClick={onSubmit}/>
                </div>
            </div>
        )
    };

    getAnswerContent = (ans: AnswerDto) => {
        return (
            <div>
                <p style={{margin: "30px 0px"}}>{ans.content}</p>
                <Divider />
                {this.getFooterPostedBy(new Date(ans.createdUtc).toLocaleString(), ans.author)}
            </div>
        );
    };

    getQuestionContent = () => {
        let question = this.state.questionPage.question;
        let editBut = ( this.props.user && question.author.username == this.props.user.username && !this.state.editQuestion) ?
            <div style={{float: "right"}}>
                <RaisedButton label="Edit" onClick={this.editPost} style={{float: "right"}}/>
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
                    <p style={{margin: "30px 0px"}}>{question.content}</p>
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
                editButton = <RaisedButton label="Edit" onClick={this.addAnswer} style={{float: "right"}}/>;
            if (this.state.editAnswer) {
                editButton = null;
                content = this.getEditor(ans.content, this.onAnswerChange, this.submitStudentAnswer);
            } else if (ans != null) {
                content = this.getAnswerContent(ans);
            }
            console.log(editButton, content);
            list.push(
                <Paper key={ans._id + ans.author} style={paperStyle}>
                    <h4 style={headerStyle}>Student Answer</h4>
                    {editButton}
                    <Divider />
                    {content}
                </Paper>
            );
        }
        if (this.props.user != undefined && !this.state.editAnswer) {
            list.push(
                <div key="edit-answer-button" style={{float: 'right', marginTop: 5}}>
                    <FloatingActionButton onTouchTap={this.addAnswer}>
                        <Add/>
                    </FloatingActionButton >
                </div>
            )
        }
        return list;
    };

    editComment = (index?: number) => {
        // let comments = this.state.questionPage.comments;
        // if (index == null) {
        //     comments.push(this.generateNewComment());
        //     index = comments.length - 1;
        //     let updateObj = this.state.questionPage;
        //     updateObj.comments = comments;
        //     this.props.onChange(updateObj);
        // }
        // this.setState({editComment: true, commentId: index});
    };

    generateNewComment = (): CommentDto => {
        return {
            commentBy: this.props.user,
            commentContent: '',
            lastEditedUtc: undefined
        };
    };

    onCommentTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let temp = this.state.questionPage;
        // temp.question.comments[this.state.commentId].content = event.target.value;
        // this.props.changeQuestionPage(temp);
    };

    onCommentSubmit = () => {
        // let comment = this.state.questionPage.comments[this.state.commentId];
        // if (comment.commentDate == null) {
        //     // add comment
        // } else {
        // }
        // // update comment
    };


    // getComments = () => {
    //     let content = [];
    //     if (this.state.questionPage.comments.length <= 0 && !this.state.editComment) {
    //         content.push(<p key={"0"} style={{color: "grey", textAlign: "center"}}>There are currently no comments</p>);
    //     } else {
    //         for (let i = 0; i < this.state.questionPage.comments.length; i++) {
    //             if (this.state.commentId != i) {
    //                 let comment = this.state.questionPage.comments[i];
    //                 let edit = (comment.userEmail == this.props.user.email)?
    //                     (<div>
    //                             <RaisedButton label="Edit" onClick={() => {this.editComment(i)}}
    //                                           style={{float: "left"}}/>
    //                             <RaisedButton label="Delete" onClick={() => {this.deleteComment(i)}}
    //                                           style={{float: "left"}}/></div>
    //
    //                     ) : null;
    //                 content.push(
    //                     <Paper key={i.toString()} zDepth={3} style={{padding: 10, margin : "10px 0px"}}>
    //                         <p>{comment.content}</p>
    //                         <Divider />
    //                         {edit}
    //                         {this.getFooterPostedBy(new Date(comment.commentDate).toLocaleString(), comment.userEmail)}
    //                     </Paper>
    //                 )
    //             } else {
    //                 content.push(
    //                     <div key={i.toString()}>
    //                         {this.getEditor(this.state.questionPage.comments[i].content,
    //                             this.onCommentTextChange, this.onCommentSubmit)}
    //                         <Divider />
    //                     </div>
    //                 )
    //             }
    //         }
    //     }
    //     let newEditTextBox;
    //     if (this.state.editComment && this.state.commentId == null) {
    //         let commentIndex = this.getCommentIndexFromComment(this.generateNewComment(), this.state.questionPage.comments);
    //
    //         newEditTextBox = this.getEditor(this.state.questionPage.comments[commentIndex].content,
    //             this.onCommentTextChange, this.onCommentSubmit);
    //     }
    //
    //
    //     let newPostButton = (this.state.editComment) ? null :
    //         <div style={{textAlign: "right"}}>
    //             <FloatingActionButton mini={true} onTouchTap={() => {
    //                 this.editComment()
    //             }}>
    //                 <ContentAdd />
    //             </FloatingActionButton>
    //         </div>;
    //
    //
    //     return (
    //         <Paper style={{height: "100%", margin: 10, padding: 15}}>
    //             <h4 style={headerStyle}>comments</h4>
    //             <Divider />
    //             {content}
    //             {newEditTextBox}
    //             {newPostButton}
    //         </Paper>
    //     );
    // }


    render() {
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

export const QuestionPage = AnimatedWrapper(connect(
    (state: AppStoreState) => ({
        user: state.auth.user,
        ...state.questionPage
    }),
    (dispatch) => ({
        fetchQuestionPage: (title: string) => dispatch(QuestionActions.fetchQuestionPage(title)),
        changeQuestionPage: (questionPage: QuestionPageDto) => dispatch(QuestionActions.changeQuestionPage(questionPage))
    })
)(QuestionPageComponent));