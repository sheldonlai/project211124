import * as React from "react";
import {Component} from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import {EditableMultiPurposeHeader} from "../../../components/Headers/EditableMultiPurposeHeader";
import {ChipListComponent} from "../../../components/Forms/ChipListComponent";
import Divider from "material-ui/Divider";
import {QAEditorComponent} from "./Q&AEditorComponent";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import Icon from 'material-ui/Icon';
import Paper from "material-ui/Paper";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import Question = FrontEndQuestionModels.Question;
import cloneQuestion = FrontEndQuestionModels.cloneQuestion;
import {CommentsComponent} from "./CommentsComponent";
import cloneAnswer = FrontEndQuestionModels.cloneAnswer;
import {AppStoreState} from "../../../stores/AppStore";
import {QuestionActions} from "../../../actions/QuestionActions";
import {connect} from "react-redux";
import {Prompt} from "react-router";
import {FooterComponent} from "./FooterComponent";
import {QuestionEditorReducerState} from "../../../reducers/QuestionEditorReducer";
import {CommentDto} from "../../../../../server/dtos/q&a/CommentDto";

interface QuestionBoxComponentProps {
    user: UserDto; // current user
    question: Question; // original question
    questionEditorState: Question; // editor state
    edit: boolean; // edit mode
}
interface props extends QuestionBoxComponentProps, DispatchProps {

}

let paperStyle = {height: "100%"};

export class QuestionBoxComponent extends Component<props, {}> {

    onTitleChange = (event) => {
        let question = cloneQuestion(this.props.questionEditorState);
        question.title = event.target.value;
        this.props.changeQuestionEditorState({edit: this.props.edit, question});
    };

    onContentChange = (editorState) => {
        let question = cloneQuestion(this.props.questionEditorState);
        question.content = editorState;
        this.props.changeQuestionEditorState({edit: this.props.edit, question});
    };

    onEditClick = () => {
        this.props.changeQuestionEditorState({edit: true, question: this.props.questionEditorState});
    };

    onCommentSubmit = (comments) => {
        let question = cloneQuestion(this.props.question);
        question.comments = comments;
        this.props.createComment(question);
        this.props.changeQuestionEditorState({edit: this.props.edit, question});
        // TODO : Create edit/create comment actions
        //this.onSubmit();
    };

    onCommentUpdate = (commentIndx, updatedComment) => {
      let question = cloneQuestion(this.props.question);
      this.props.UpdateComment(question, commentIndx, updatedComment);
      this.props.changeQuestionEditorState({edit: this.props.edit, question});
    };

    onCommentDelete = (commentIndx) => {
      let question = cloneQuestion(this.props.question);
      this.props.DeleteComment(question, commentIndx);
      this.props.changeQuestionEditorState({edit: this.props.edit, question});
    };

    resetQuestion = () => {
        let question = cloneQuestion(this.props.question);
        this.props.changeQuestionEditorState({edit: false, question});
    };

    upVote = () => {
        this.props.upVoteQuestion(this.props.question);
    };

    downVote = () => {
        this.props.downVoteQuestion(this.props.question);
    };

    onSubmit = () => {
        this.props.editQuestion(this.props.questionEditorState);
    };

    render() {
        const question: Question = {...this.props.questionEditorState};
        const editable = this.props.user && (this.props.user.username === question.author.username);
        let editButton;
        if (editable && !this.props.edit) {
            editButton = (
                <div style={{float: "right"}}>
                    <Button color="primary" onClick={this.onEditClick}>Edit</Button>
                </div>
            )
        }
        return (
            <div>
                <Prompt
                    when={this.props.edit}
                    message={location => (
                        `All unsaved changes will be discarded. Are you sure you want to leave?`
                    )}
                />
                <Paper style={paperStyle} elevation={0}>
                    <EditableMultiPurposeHeader value={question.title} editMode={this.props.edit}
                                                onEditClick={this.onEditClick}
                                                onTitleChange={this.onTitleChange}/>
                    {editButton}
                    <Divider />
                    <div>
                        <QAEditorComponent value={question.content} onChange={this.onContentChange}
                                           onSubmit={this.onSubmit} readOnly={!this.props.edit}
                                           style={{fontSize: 14}} reset={this.resetQuestion}
                        />
                        <div>
                            <ChipListComponent chips={question.tags} keyName={"tag"}/>
                        </div>
                        <Divider/>
                        <FooterComponent
                            onUpVote={this.upVote}
                            onDownVote={this.downVote}
                            upVotes={question.upVotes}
                            downVotes={question.downVotes}
                            author={question.author}
                            createdUtc={question.createdUtc}
                            views={question.views}
                        />
                    </div>
                </Paper>
                <CommentsComponent comments={this.props.question.comments}
                                   user={this.props.user}
                                   onCommentsSubmit={this.onCommentSubmit}
                                   onCommentUpdate={this.onCommentUpdate}
                                   onCommentDelete={this.onCommentDelete}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: AppStoreState) => ({
    user: state.auth.user,
    question: state.questionPage.questionPage.question,
    questionEditorState: state.questionEditorState.question,
    edit: state.questionEditorState.edit
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
    upVoteQuestion: (question: Question) => dispatch(QuestionActions.upVoteQuestion(question)),
    downVoteQuestion: (question: Question) => dispatch(QuestionActions.downVoteQuestion(question)),
    editQuestion: (question: Question) => dispatch(QuestionActions.updateQuestion(question)),
    changeQuestionEditorState: (state: QuestionEditorReducerState) =>
        dispatch(QuestionActions.changeQuestionEditorState(state)),
    createComment: (question: Question) => dispatch(QuestionActions.createComment(question)),
    UpdateComment: (question: Question, commentIndex: number, updatedComment: CommentDto) =>
        dispatch(QuestionActions.updateComment(question, commentIndex, updatedComment)),
    DeleteComment: (question: Question, commentIndex: number) =>
        dispatch(QuestionActions.deleteComment(question, commentIndex)),
});

interface DispatchProps {
    upVoteQuestion: (question: Question) => void;
    downVoteQuestion: (question: Question) => void;
    editQuestion: (question: Question) => void;
    changeQuestionEditorState: (state: QuestionEditorReducerState) => void;
    createComment: (question: Question) => void;
    UpdateComment: (question: Question, commentIndex: number, updatedComment: CommentDto) => void;
    DeleteComment: (question: Question, commentIndex: number) => void;
}

export const QuestionBoxView = connect<QuestionBoxComponentProps, DispatchProps, any>(
    mapStateToProps, mapDispatchToProps)(QuestionBoxComponent);