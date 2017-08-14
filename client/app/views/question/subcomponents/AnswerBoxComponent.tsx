import * as React from "react";
import {Component} from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import Divider from "material-ui/Divider";
import {QAEditorComponent} from "./Q&AEditorComponent";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import Question = FrontEndQuestionModels.Question;
import Answer = FrontEndQuestionModels.Answer;
import cloneAnswer = FrontEndQuestionModels.cloneAnswer;
import {FooterComponent} from "./FooterComponent";
import {connect} from "react-redux";
import {AnswerActions} from "../../../actions/AnswerActions";
import {CommentDto} from "../../../../../server/dtos/q&a/CommentDto";

export interface AnswerBoxComponentProps {
    onAnswerChange: (answer: Answer) => void;
    onSubmit: () => void;
    onEditClick: () => void;
    user: UserDto;
    answer: Answer;
    editMode: boolean;
    resetAnswer?: () => void;
    createComment: (answer: Answer) => void;
    UpdateComment: (answer: Answer, commentIndx: number, updatedComment: CommentDto) => void;
    DeleteComment: (answer: Answer, commentIndx: number) => void;
}

interface dispatch {
    upVote: (answer: Answer) => void
    downVote: (answer: Answer) => void
}


const paperStyle = {height: "100%", padding: 15};

export class AnswerBoxComponent extends Component<AnswerBoxComponentProps & dispatch> {

    onContentChange = (editorState) => {
        let answer = cloneAnswer(this.props.answer);
        answer.content = editorState;
        this.props.onAnswerChange(answer);
    };

    upVote  = () => this.props.upVote(this.props.answer);

    downVote = () => this.props.downVote(this.props.answer);

    onCommentSubmit = (comments) => {
        let answer = cloneAnswer(this.props.answer);
        answer.comments = comments;
        this.props.createComment(answer);
    };

    onUpdateComment = (commentIndx, updatedComment) => {
        let answer = cloneAnswer(this.props.answer);
        this.props.UpdateComment(answer, commentIndx, updatedComment);
    };

    onDeleteComment = (commentIndx) =>{
        let answer = cloneAnswer(this.props.answer);
        this.props.DeleteComment(answer, commentIndx);
    };

    render() {
        const answer: Answer = {...this.props.answer};
        const editable = (this.props.user && this.props.user.username === answer.author.username);
        return (

            <Paper style={paperStyle}>
                <div>
                    <Grid container justify="flex-end">
                        <Grid item>
                            {editable && !this.props.editMode &&
                            <Button color="primary" onClick={this.props.onEditClick}>Edit</Button>}
                        </Grid>
                    </Grid>
                    <QAEditorComponent value={this.props.answer.content} onChange={this.onContentChange}
                                       onSubmit={this.props.onSubmit} readOnly={!this.props.editMode}
                                       style={{fontSize: 14}} reset={this.props.resetAnswer}
                    />
                    <Divider/>

                    <Divider/>
                    <FooterComponent
                        onUpVote={this.upVote}
                        onDownVote={this.downVote}
                        upVotes={answer.upVotes}
                        downVotes={answer.downVotes}
                        author={answer.author}
                        createdUtc={answer.createdUtc}
                    />
                </div>
            </Paper>
        )
    }
}



const mapDispatchToProps = (dispatch) => ({
    upVote: (answer: Answer) => dispatch(AnswerActions.upVoteAnswer(answer)),
    downVote: (answer: Answer) => dispatch(AnswerActions.downVoteAnswer(answer)),
    createComment: (answer: Answer) => dispatch(AnswerActions.createComment(answer)),
});

export const AnswerBoxView = connect<void, dispatch, AnswerBoxComponentProps>(
    undefined,
    mapDispatchToProps
)(AnswerBoxComponent);