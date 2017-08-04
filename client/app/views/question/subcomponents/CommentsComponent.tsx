import * as React from "react";
import {CommentDto} from "../../../../../server/dtos/q&a/CommentDto";
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
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


export interface CommentsComponentProps {
    comments: CommentDto[];
    user: UserDto;
    onCommentsSubmit: (comments: CommentDto[]) => void;
}

export interface CommentsComponentState {
    inputMode: boolean;
    commentContent: string;
    errorMsg: string;
    EditCommentIndx: number;
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
        this.state = {
            inputMode: false,
            commentContent: "",
            errorMsg: "",
            EditCommentIndx: -1,
        };
    }

    addNewComment = () => {
        if (this.state.commentContent) {
            let tmpComment: CommentModel = new CommentModel();
            tmpComment.commentContent = this.state.commentContent;
            tmpComment.commentBy = this.props.user;
            this.props.comments.push(tmpComment);
            this.props.onCommentsSubmit(this.props.comments);
            this.setState({commentContent: ""});
            this.setState({errorMsg: ""});
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
                    <Button raised color="primary" className={styleSheet.root} onClick={this.addNewComment}>
                        Submit
                    </Button>
                </div>
            )
        }
        return undefined;
    };

    DeleteComment = (indx: number) => {
        this.props.comments.splice(indx, 1);
        this.props.onCommentsSubmit(this.props.comments);
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
                    <Button color = "primary" onClick = {() => this.UpdateEditedComment(indx)}>save</Button>
                </div>
            );
        }
    };

    UpdateEditedComment = (indx) => {
        if(this.state.commentContent){
            this.props.comments[indx].commentContent = this.state.commentContent;
            this.props.comments[indx].lastEditedUtc = new Date(Date.now());
            this.props.onCommentsSubmit(this.props.comments);
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

    renderComments = () => {
        return this.props.comments.map((comment, indx) => {
            return (
                <ListItem key={comment.lastEditedUtc + comment.commentBy.username}>
                    <ListItemText primary={this.onEditComment(indx)}></ListItemText>
                    <div style={{color: "grey", fontSize: 10, textAlign: "right"}}>
                        {comment.commentedDate && <div>Posted on {comment.commentedDate}</div>}
                        <br/>
                        by {comment.commentBy.username}
                    </div>
                        {this.EditAndSaveButton(indx)}
                        {this.CancelAndDeleteButton(indx)}
                </ListItem>
            )
        });
    };

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
            </div>
        );
    }
}