/**
 * Created by SHELDON on 6/24/2017.
 */
import * as React from "react";
import {ChangeEvent} from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {QuestionReducerState} from "../../reducers/QuestionReducer";
import {ErrorReducerState} from "../../reducers/ErrorReducer";
import {grey300, grey800} from "material-ui/styles/colors";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import TextField from "material-ui/TextField";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {QuestionPageDto} from "../../../../server/dtos/q&a/QuestionPageDto";
import {AnswerDto} from "../../../../server/dtos/q&a/AnswerDto";
import {CommentDto} from "../../../../server/dtos/q&a/CommentDto";
import {RouteComponentProps} from "react-router";

export interface QuestionPageProps extends RouteComponentProps<{title: string}> {
    user: UserDto
    questionPage: QuestionPageDto
    fetchQuestionPage: (title : string) => any;
    changeQuestionPage : (questionPage: QuestionPageDto)=>any;
}

export interface QuestionPageState {
    editQuestion: boolean
    editAnswer: boolean
    answerId: string;
    editComment: boolean
    commentId: string
    loading: boolean
}

let headerStyle = {
    margin: "10px 0px",
    display: "inline-block"
}

let paperStyle = {height: "100%", margin: 10, padding: 15, paddingBottom: 0};

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
        }
    }

    componentWillMount(){
        if (this.props.questionPage == undefined){
            console.log(this.props.match)
            this.props.fetchQuestionPage(this.props.match.params.title);
        }
    }

    componentWillReceiveProps(nextProps: QuestionPageProps){
        if (nextProps.questionPage != this.props.questionPage) {
            this.resetStates();
        }
    }

    titleChange = (event: any, value: string) => {

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
    }


    onQuestionTitleChange = (event : any, value: string) => {
        let temp: QuestionPageDto = this.props.questionPage;
        temp.question.title = value;
        this.props.changeQuestionPage(temp);
    }
    onQuestionContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let temp: QuestionPageDto = this.props.questionPage;
        temp.question.content = event.target.value;
        this.props.changeQuestionPage(temp);
    }
    onAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let temp: QuestionPageDto = this.props.questionPage;
        temp.answers.map((answer : AnswerDto) => {
            if (answer._id === this.state.answerId) {
                answer.content = event.target.value;
            }
            return answer;
        })
        this.props.changeQuestionPage(temp);
    }

    submit = () => {

    }

    editPost = () => {
        if (!this.state.editQuestion)
            this.setState({editQuestion: true});
    }
    submitPost = () => {
        this.setState({loading: true});
        // update post
    }

    editAnswer = () => {
    }


    submitStudentAnswer = () => {
        let temp = this.props.questionPage;
        let promise;
        this.setState({loading: true});
        // add Answer
        // update Answer
    }

    getFooterPostedBy = (date: string, name: string) => {
        return (
            <p style={{color: "grey", fontSize: 10, textAlign: "right"}}>
                Posted on {date}
                <br/>
                by {name}
            </p>
        )
    }

    getEditor = (value: string, onChange: (event: ChangeEvent<HTMLTextAreaElement>) => any, onSubmit: () => any) => {
        return (
            <div style={{textAlign: "right", marginBottom: 15}}>
                    <textarea style={{width: "100%", minHeight: 150}}
                              value={value}
                              onChange={onChange}
                    >
                    </textarea>
                <RaisedButton label="save" onClick={onSubmit}/>
            </div>
        )
    }
    getAnswerContent = (ans: AnswerDto) => {
        return (
            <div>
                <p style={{margin: "30px 0px"}}>{ans.content}</p>
                <Divider />
                {this.getFooterPostedBy(new Date(ans.createdUtc).toLocaleString(),ans.author)}
            </div>
        );
    }

    getQuestionContent = () => {
        let question = this.props.questionPage.question;
        let editBut = (question.author.username == this.props.user.username && !this.state.editQuestion)?
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
            content = this.getEditor(this.props.questionPage.question.content, this.onQuestionContentChange, this.submitPost);
        } else {
            let tags = (this.props.questionPage.question.tags != null)?
                this.props.questionPage.question.tags.map((folderName : string)=> {
                    return <span style={{fontSize: 14, color: grey800, backgroundColor: grey300, padding : 4, margin : 4}}
                                 key={folderName}
                    >
                        {folderName}
                    </span>
                }) : null;
            content =
                <div>
                    <p style={{margin: "30px 0px"}}>{question.content}</p>
                    <div style={{height: 24}}>
                        {tags}
                    </div>
                    <Divider />
                    {this.getFooterPostedBy(new Date(question.dateCreated).toLocaleString(),question.author.username)}
                </div>
        }
        return (
            <Paper style={paperStyle}>
                {title}
                <Divider />
                {content}
            </Paper>
        );
    }

    getAnswersContent = () => {
        for (let sAns of this.props.questionPage.answers) {
            let content;

            let editButton = (this.props.user.role != 1) ? null : ( // is instructor then null
                <RaisedButton label="Edit" onClick={this.editAnswer}
                              style={{float: "right"}}/>
            );
            if (this.state.editAnswer) {
                editButton = null;
                content = this.getEditor(sAns.content,
                    this.onAnswerChange, this.submitStudentAnswer);
            } else if (sAns != null) {
                content = this.getAnswerContent(sAns);
            }
            return (
                <Paper style={paperStyle}>
                    <h4 style={headerStyle}>Student Answer</h4>
                    {editButton}
                    <Divider />
                    {content}
                </Paper>
            );
        }
    }

    editComment = (index?: number) => {
        // let comments = this.props.questionPage.comments;
        // if (index == null) {
        //     comments.push(this.generateNewComment());
        //     index = comments.length - 1;
        //     let updateObj = this.props.questionPage;
        //     updateObj.comments = comments;
        //     this.props.onChange(updateObj);
        // }
        // this.setState({editComment: true, commentId: index});
    }

    generateNewComment = (): CommentDto => {
        return {
            commentBy: this.props.user,
            commentContent: '',
            lastEditedUtc: undefined
        };
    }

    onCommentTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let temp = this.props.questionPage;
        // temp.question.comments[this.state.commentId].content = event.target.value;
        // this.props.changeQuestionPage(temp);
    }

    onCommentSubmit = () => {
        // let comment = this.props.questionPage.comments[this.state.commentId];
        // if (comment.commentDate == null) {
        //     // add comment
        // } else {
        // }
        // // update comment
    }



    // getComments = () => {
    //     let content = [];
    //     if (this.props.questionPage.comments.length <= 0 && !this.state.editComment) {
    //         content.push(<p key={"0"} style={{color: "grey", textAlign: "center"}}>There are currently no comments</p>);
    //     } else {
    //         for (let i = 0; i < this.props.questionPage.comments.length; i++) {
    //             if (this.state.commentId != i) {
    //                 let comment = this.props.questionPage.comments[i];
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
    //                         {this.getEditor(this.props.questionPage.comments[i].content,
    //                             this.onCommentTextChange, this.onCommentSubmit)}
    //                         <Divider />
    //                     </div>
    //                 )
    //             }
    //         }
    //     }
    //     let newEditTextBox;
    //     if (this.state.editComment && this.state.commentId == null) {
    //         let commentIndex = this.getCommentIndexFromComment(this.generateNewComment(), this.props.questionPage.comments);
    //
    //         newEditTextBox = this.getEditor(this.props.questionPage.comments[commentIndex].content,
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
        if (this.props.questionPage == null) {
            return (
                <Paper style={{height: "100%", margin: 10, padding: "200px 0px", textAlign: "center"}}>
                    <h3>Please choose a Post</h3>
                </Paper>
            )
        }
        let postDisplay = this.getQuestionContent();
        let studentAns = this.getAnswersContent();
        return (
            <div style={{}}>
                {postDisplay}
                {studentAns}
            </div>
        )
    }
}

export const QuestionPage = connect(
    (state: AppStoreState) => ({
        user : state.auth.user,
        ...state.questionPage
    }),
    (dispatch) => ({
        fetchQuestionPage: (title: string) => dispatch(QuestionActions.fetchQuestionPage(title)),
        changeQuestionPage : (questionPage: QuestionPageDto) => dispatch(QuestionActions.changeQuestionPage(questionPage))
    })
)(QuestionPageComponent)