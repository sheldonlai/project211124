import * as React from "react";
import {Component} from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import Divider from "material-ui/Divider";
import {QAEditorComponent} from "./Q&AEditorComponent";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import {QuestionFooterComponent} from "./QuestionFooterComponent";
import {connect} from "react-redux";
import {AnswerActions} from "../../../actions/AnswerActions";
import {CommentDto} from "../../../../../server/dtos/q&a/CommentDto";
import {CommentsComponent} from "./CommentsComponent";
import Answer = FrontEndQuestionModels.Answer;
import cloneAnswer = FrontEndQuestionModels.cloneAnswer;
import {SharedCommentsComponent} from "../../../components/Comments/SharedCommentsComponent";
import Icon from "material-ui/Icon/Icon";
import {AppStoreState} from "../../../stores/AppStore";
import {PRIMARY_COLOR} from "../../router";

export interface AnswerBoxComponentProps{
    onAnswerChange: (answer: Answer) => void;
    onSubmit: () => void;
    onEditClick: () => void;
    user: UserDto;
    answer: Answer;
    editMode: boolean;
    resetAnswer?: () => void;
    onMarkAnswerAsCorrect: () => void;
}

const paperStyle = {height: "100%", padding: 5,};

export class AnswerBoxComponent extends Component<AnswerBoxComponentProps & dispatch & stateToProps> {

    onContentChange = (editorState) => {
        let answer = cloneAnswer(this.props.answer);
        answer.content = editorState;
        this.props.onAnswerChange(answer);
    };

    upVote = () => this.props.upVote(this.props.answer);

    downVote = () => this.props.downVote(this.props.answer);

    render() {
        const answer: Answer = {...this.props.answer};
        const editable = (this.props.user && this.props.user.username === answer.author.username);
        return (
            <div style={{ marginLeft: "40px", }}>
                <Paper style={{...paperStyle, marginBottom: 10, marginTop: 10, position: "relative"}} elevation={1}>
                    <div>
                        <Grid container justify="flex-end">
                            <Grid item>
                                {this.props.user._id === this.props.questionAuthor._id && !this.props.editMode &&
                                <Button color="primary" onClick={this.props.onMarkAnswerAsCorrect}>
                                    Mark as Correct
                                </Button>}
                                {editable && !this.props.editMode &&
                                <Button color="primary" onClick={this.props.onEditClick}>Edit</Button>}
                            </Grid>
                            <Divider/>
                        </Grid>

                        <QAEditorComponent value={this.props.answer.content} onChange={this.onContentChange}
                                           onSubmit={this.props.onSubmit} readOnly={!this.props.editMode}
                                           style={{fontSize: 14}} reset={this.props.resetAnswer}
                        />
                        <Divider/>
                        <QuestionFooterComponent
                            onUpVote={this.upVote}
                            onDownVote={this.downVote}
                            upVotes={answer.upVotes}
                            downVotes={answer.downVotes}
                            author={answer.author}
                            createdUtc={answer.createdUtc}
                        />
                    </div>
                    {answer.correct &&
                    <Grid container align={"center"}
                          style={{position: "absolute", left: -40 ,top: 0, height: "100%", width:40}}>
                        <Grid item>
                            <Icon style={{fontSize: 40, color: PRIMARY_COLOR}}>check</Icon>
                        </Grid>
                    </Grid>}
                </Paper>
                <SharedCommentsComponent comments={this.props.answer.comments}
                                         user={this.props.user}
                                         onCommentCreate={(c) => this.props.createComment(c, answer._id)}
                                         onCommentUpdate={(c) => this.props.updateComment(c, answer._id)}
                                         onCommentDelete={(c) => this.props.deleteComment(c, answer._id)}
                />
            </div>
        )
    }
}

interface dispatch {
    upVote: (answer: Answer) => void
    downVote: (answer: Answer) => void
    createComment: (comment: CommentDto, answerId: string) => void;
    updateComment: (comment: CommentDto, answerId: string) => void;
    deleteComment: (comment: CommentDto, answerId: string) => void;
}

interface stateToProps {
    questionAuthor: UserDto;
}

const mapStateToProps = (state: AppStoreState): stateToProps => ({
    questionAuthor : state.questionPage.questionPage.question.author
});

const mapDispatchToProps = (dispatch): dispatch => ({
    upVote: (answer: Answer) => dispatch(AnswerActions.upVoteAnswer(answer)),
    downVote: (answer: Answer) => dispatch(AnswerActions.downVoteAnswer(answer)),
    createComment: (comment: CommentDto, answerId: string) => dispatch(AnswerActions.createComment(comment, answerId)),
    updateComment: (comment: CommentDto, answerId: string) => dispatch(AnswerActions.updateComment(comment, answerId)),
    deleteComment: (comment: CommentDto, answerId: string) => dispatch(AnswerActions.deleteComment(comment, answerId)),
});

export const AnswerBoxView = connect<stateToProps, dispatch, AnswerBoxComponentProps>(
    mapStateToProps,
    mapDispatchToProps
)(AnswerBoxComponent);