import * as React from "react";
import {CommentDto} from "../../../../../server/dtos/q&a/CommentDto";
import PropTypes from 'prop-types';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import {CSSProperties} from "react";
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton'
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import CommentModel = FrontEndQuestionModels.CommentModel;
import _ = require("lodash");


export interface CommentsComponentProps {
    comments: CommentDto[];
    user: UserDto;
    onCommentsSubmit: (comments: CommentDto[]) => void;
    onCommentUpdate: (commentId: string, updatedComment: CommentDto) => void;
    onCommentDelete: (commentId: string) => void;
}

export interface CommentsComponentState {
    inputMode: boolean;
    commentContent: string;
    errorMsg: string;
    EditCommentIndx: number;
    showMaxComments: number;
}

const styleSheet: CSSProperties = {
    root: {
        width: '100%',
        maxWidth: '360px'
    }
};

export class CommentsComponent extends React.Component<CommentsComponentProps, CommentsComponentState> {
    constructor(props) {
        super(props);
        //console.log(this.props.comments);
        this.state = {
            inputMode: false,
            commentContent: "",
            errorMsg: "",
            EditCommentIndx: -1,
            showMaxComments: 5,
        };
    }

    addNewComment = () => {
        if (this.state.commentContent) {
            let tmpComment: CommentDto = {
                _id: undefined,
                commentContent: this.state.commentContent,
                commentedDate: new Date(Date.now()),
                commentBy: this.props.user,
                lastEditedUtc: new Date(Date.now()),
            }
            let comments = [...this.props.comments];
            comments.push(tmpComment);
            this.props.onCommentsSubmit(comments);
            this.setState({commentContent: "", errorMsg: "", inputMode: false, showMaxComments: this.props.comments.length + 1});
        }
        else {
            this.setState({errorMsg: "Cannot submit empty comment."});
        }
    };

    onCommentChange = (event) => {
        this.setState({commentContent: event.target.value});
    };

    onErrMsg = () => {
        if (this.state.errorMsg != "") {
            return (
                <p>
                    <mark>{this.state.errorMsg}</mark>
                </p>
            )
        }
        return undefined;
    };

    renderInputCommentBox() {
        if (this.state.inputMode) {
            return (
                <div>
                    {this.onErrMsg()}
                    <form>
                        <textarea rows={4} cols={50} value={this.state.commentContent}
                                  onChange={this.onCommentChange}></textarea>
                    </form>
                    <Button raised color="primary" onClick={this.addNewComment}>
                        Submit
                    </Button>
                </div>
            )
        }
        return undefined;
    };

    DeleteComment = (indx: number) => {
        let commentId: string = this.props.comments[indx]._id;
        this.props.comments.splice(indx, 1);
        this.props.onCommentDelete(commentId);
    };

    onEditComment = (indx: number) => {
        if(this.state.EditCommentIndx == -1 || indx != this.state.EditCommentIndx){
            return(
                this.props.comments[indx].commentContent
            );
        } else if(indx == this.state.EditCommentIndx){
            return(
            <div>
            <p>
                <mark>{this.state.errorMsg}</mark>
            </p>
                <textarea defaultValue={this.props.comments[indx].commentContent} onChange={this.onCommentChange}></textarea>
            </div>
            )
        }
        return undefined;
    };

    EditAndSaveButton = (indx: number) => {
        if(this.state.EditCommentIndx == -1 || indx != this.state.EditCommentIndx){
            return(
                <IconButton>
                <Icon onClick = {() => this.setState({EditCommentIndx: indx, commentContent: this.props.comments[indx].commentContent, errorMsg: ""})}>mode_edit</Icon>
                </IconButton>
            );
        }
        else{
            return(
                <div  style={{textAlign: "left"}}>
                    <Button color = "primary" onClick = {() => this.UpdateEditedComment(this.props.comments[indx]._id)}>save</Button>
                </div>
            );
        }
    };

    UpdateEditedComment = (commentId: string) => {
        if(this.state.commentContent){
            let indx: number = _.findIndex(this.props.comments, function(comment){return comment._id == commentId});
            this.props.comments[indx].commentContent = this.state.commentContent;
            this.props.comments[indx].lastEditedUtc = new Date(Date.now());
            let updatedComment: CommentDto = this.props.comments[indx];
            this.props.onCommentUpdate(commentId, updatedComment);
            this.setState({EditCommentIndx: -1, commentContent: ""});
        }
        else{
            this.setState({errorMsg: "Cannot submit empty comment."});
        }
    };

    CancelAndDeleteButton = (indx: number) => {
        if(this.state.EditCommentIndx == -1 || indx != this.state.EditCommentIndx){
            return(
                <IconButton>
                    <Icon onClick = {() => this.DeleteComment(indx)}>delete</Icon>
                </IconButton>
            );
        }
        else{
            return(
                <div  style={{textAlign: "left"}}>
                    <Button onClick = {() => this.setState({EditCommentIndx: -1, commentContent: "", errorMsg: ""})}>cancel</Button>
                </div>
            );
        }
    };

    renderCommentActions = (commentBy: UserDto, commentIndx: number) => {
        if(this.props.user && this.props.user.username == commentBy.username && commentBy._id == this.props.user._id){
            return(
                <div>
                    {this.EditAndSaveButton(commentIndx)}
                    {this.CancelAndDeleteButton(commentIndx)}
                </div>
            )
        }
        return undefined;
    }

    renderComments = () => {
        let comments:CommentDto[] = this.props.comments.slice(0, this.state.showMaxComments);
        //<div>Posted on {comment.commentedDate}</div>
        return comments.map((comment, indx) => {
            return (
                <ListItem key={comment.lastEditedUtc + comment.commentBy.username}>
                    <ListItemText primary={this.onEditComment(indx)}></ListItemText>
                    <div style={{color: "grey", fontSize: 10, textAlign: "right"}}>
                        <br/>
                        by {comment.commentBy.username}
                    </div>
                    {this.renderCommentActions(comment.commentBy, indx)}
                </ListItem>
            )
        });
    };

    onShowMore = () => {
        this.setState({showMaxComments: this.props.comments.length + 1})
    }

    render() {
        return (
            <div>
                <List className={"Comments"}>
                    {this.renderComments()}
                    <Divider light/>
                </List>
                <div className={styleSheet.root}>
                    <IconButton>
                        <Icon onClick={() => this.setState({inputMode: !this.state.inputMode}) }>add_circle</Icon>
                    </IconButton>
                </div>
                {this.renderInputCommentBox()}
                <a style={{cursor: 'pointer'}}onClick={this.onShowMore}>Show more comments</a>
            </div>
        );
    }
}