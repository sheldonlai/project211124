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
            this.setState({errorMsg: ""});
            let tmpComment: CommentModel = new CommentModel();
            tmpComment.commentContent = this.state.commentContent;
            tmpComment.commentBy = this.props.user;
            this.props.comments.push(tmpComment);
            this.props.onCommentsSubmit(this.props.comments);
            this.setState({commentContent: ""});
        }
        else {
            this.setState({errorMsg: "Cannot submit empty comment."});
        }
    }

    onCommentChange = (event) => {
        this.setState({commentContent: event.target.value});
    }

    onErrMsg = () => {
        if (this.state.errorMsg != "") {
            return (
                <p>
                    <mark>{this.state.errorMsg}</mark>
                </p>
            )
        }
    }

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
    }

    DeleteComment = (comment: CommentDto) => {
        this.props.comments.splice(this.props.comments.indexOf(comment), 1);
        this.props.onCommentsSubmit(this.props.comments);
    };

    EditComment = (comment: CommentDto) => {
        if(this.state.EditCommentIndx == -1){
            return;
        }
        let indx:number = this.props.comments.indexOf(comment);
        if(indx == this.state.EditCommentIndx){
            return(
                <textarea></textarea>
            )
        }
    };

    renderComments = () => {
        return this.props.comments.map((comment) => {
            return (
                <ListItem key={comment.lastEditedUtc + comment.commentBy.username}>
                    <ListItemText primary={comment.commentContent}></ListItemText>
                    <IconButton>
                    <Icon onClick = {() => this.setState({EditCommentIndx: this.props.comments.indexOf(comment)})}>mode_edit</Icon>
                    <Icon onClick = {() => this.DeleteComment(comment)}>delete</Icon>
                    </IconButton>
                    {this.EditComment(comment)}
                </ListItem>
            )
        });
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
            </div>
        );
    }
}