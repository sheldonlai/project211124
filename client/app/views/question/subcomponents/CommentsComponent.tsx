import * as React from "react";
import {CSSProperties} from "react";
import {CommentDto} from "../../../../../server/dtos/q&a/CommentDto";
import List, {ListItem, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton'
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {findIndex} from "../../../utils/ArrayUtils";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography"
import {convertDateTimeToString} from "../../../utils/DateUtils";

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

const iconButtonStyle: CSSProperties = {
    height: 24,
    width: 24
};

const iconStyle: CSSProperties = {
    fontSize: 18
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
                createdUtc: new Date(Date.now()),
                commentBy: this.props.user,
                lastEditedUtc: new Date(Date.now()),
            };
            let comments = [...this.props.comments];
            comments.push(tmpComment);
            this.props.onCommentsSubmit(comments);
            this.setState({
                commentContent: "",
                errorMsg: "",
                inputMode: false,
                showMaxComments: this.props.comments.length + 1
            });
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
                        <TextField multiline rows={4} value={this.state.commentContent}
                                   fullWidth
                                   onChange={this.onCommentChange}/>
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
        if (this.state.EditCommentIndx == -1 || indx != this.state.EditCommentIndx) {
            return (
                <Typography type="body1">
                    {this.props.comments[indx].commentContent}
                </Typography>
            );
        } else if (indx == this.state.EditCommentIndx) {
            return (
                <div>
                    <p>
                        <mark>{this.state.errorMsg}</mark>
                    </p>
                    <TextField defaultValue={this.props.comments[indx].commentContent}
                               onChange={this.onCommentChange}
                               multiline
                               fullWidth
                               style={{fontSize: 14}}
                    />
                </div>
            )
        }
        return undefined;
    };

    EditAndSaveButton = (indx: number) => {
        if (this.state.EditCommentIndx == -1 || indx != this.state.EditCommentIndx) {
            return (
                <IconButton style={iconButtonStyle}>
                    <Icon style={iconStyle} onClick={() => this.setState({
                        EditCommentIndx: indx,
                        commentContent: this.props.comments[indx].commentContent,
                        errorMsg: ""
                    })}>mode_edit</Icon>
                </IconButton>
            );
        }
        else {
            return (
                <div style={{textAlign: "left"}}>
                    <Button color="primary"
                            onClick={() => this.UpdateEditedComment(this.props.comments[indx]._id)}>save</Button>
                </div>
            );
        }
    };

    CancelAndDeleteButton = (indx: number) => {
        if (this.state.EditCommentIndx == -1 || indx != this.state.EditCommentIndx) {
            return (
                <IconButton style={iconButtonStyle}>
                    <Icon style={iconStyle} onClick={() => this.DeleteComment(indx)}>delete</Icon>
                </IconButton>
            );
        }
        else {
            return (
                <div style={{textAlign: "left"}}>
                    <Button onClick={() => this.setState({EditCommentIndx: -1, commentContent: "", errorMsg: ""})}>
                        cancel
                    </Button>
                </div>
            );
        }
    };

    UpdateEditedComment = (commentId: string) => {
        if (this.state.commentContent) {
            let indx: number = findIndex(this.props.comments, comment => comment._id == commentId);
            this.props.comments[indx].commentContent = this.state.commentContent;
            this.props.comments[indx].lastEditedUtc = new Date(Date.now());
            let updatedComment: CommentDto = this.props.comments[indx];
            this.props.onCommentUpdate(commentId, updatedComment);
            this.setState({EditCommentIndx: -1, commentContent: ""});
        }
        else {
            this.setState({errorMsg: "Cannot submit empty comment."});
        }
    };



    renderCommentActions = (commentBy: UserDto, commentIndx: number) => {
        if (this.props.user && this.props.user.username == commentBy.username && commentBy._id == this.props.user._id) {
            return (
                <div style={{float: "right"}}>
                    {this.EditAndSaveButton(commentIndx)}
                    {this.CancelAndDeleteButton(commentIndx)}
                </div>
            )
        }
        return undefined;
    };

    renderComments = () => {
        let comments: CommentDto[] = this.props.comments.slice(0, this.state.showMaxComments);
        //<div>Posted on {comment.createdUtc}</div>
        return comments.map((comment, indx) => {
            return (
                <div key={comment.lastEditedUtc + comment.commentBy.username}
                     style={{
                         marginLeft: 15, paddingLeft: 10, minHeight: 72, marginBottom: 2,
                         borderLeft: "1px lightblue solid", borderBottom: "1px #eeeeee solid"
                     }}>
                    <div>
                        <div style={{display: "inline-block", width: "80%"}}>
                            {this.onEditComment(indx)}
                        </div>

                        {this.renderCommentActions(comment.commentBy, indx)}
                    </div>
                    <div style={{color: "grey", fontSize: 10, textAlign: "right", marginTop: 10}}>
                        posted on {convertDateTimeToString(comment.lastEditedUtc)}
                        <br/>
                        by {comment.commentBy.username}
                    </div>
                </div>
            )
        });
    };

    onShowMore = () => {
        this.setState({showMaxComments: this.props.comments.length + 1})
    };

    render() {
        return (
            <div>
                <List className={"Comments"}>
                    {this.renderComments()}
                </List>
                <div className={styleSheet.root}>
                    <IconButton>
                        <Icon onClick={() => this.setState({inputMode: !this.state.inputMode})}>add_circle</Icon>
                    </IconButton>
                </div>
                {this.renderInputCommentBox()}
                <a style={{cursor: 'pointer'}} onClick={this.onShowMore}>Show more comments</a>
            </div>
        );
    }
}