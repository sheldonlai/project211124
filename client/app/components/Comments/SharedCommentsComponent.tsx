import * as React from "react";
import {CSSProperties} from "react";
import List, {ListItem, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton'
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography"
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {CommentDto} from "../../../../server/dtos/q&a/CommentDto";
import {findIndex} from "../../utils/ArrayUtils";
import {LoadingScreen} from "../Animations/LoadingScreen";

export interface CommentsComponentProps {
    comments: CommentDto[];
    user: UserDto;
    onCommentCreate: (comment: CommentDto) => void;
    onCommentUpdate: (comment: CommentDto) => void;
    onCommentDelete?: (commentId: string) => void;
    loading? : boolean;
}

export interface CommentsComponentState {
    inputMode: boolean;
    commentContent: string;
    errorMsg: string;
    EditCommentIndex: number;
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

export class SharedCommentsComponent extends React.Component<CommentsComponentProps, CommentsComponentState> {
    constructor(props) {
        super(props);
        //console.log(this.props.comments);
        this.state = {
            inputMode: false,
            commentContent: "",
            errorMsg: "",
            EditCommentIndex: -1,
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
            };
            this.props.onCommentCreate(tmpComment);
            this.resetState();
        }
        else {
            this.setState({errorMsg: "Cannot submit empty comment."});
        }
    };

    resetState = () => {
        this.setState({
            commentContent: "",
            errorMsg: "",
            inputMode: false,
            showMaxComments: this.props.comments.length + 1
        });
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
        if (this.state.inputMode && this.state.EditCommentIndex === -1) {
            return (
                <div>
                    {this.onErrMsg()}
                    <form>
                        <TextField
                            style={{border: "1px lightgrey solid"}}
                            multiline rows={4}
                                   value={this.state.commentContent}
                                   fullWidth
                                   onChange={this.onCommentChange}/>
                    </form>
                    <div style={{height: 36, margin: "4px 0px"}}>

                        <Button
                            style={{float: "right"}}
                            color="primary"
                            onClick={this.addNewComment}>
                            Submit
                        </Button>
                        <Button
                            style={{float: "right"}}
                            onClick={this.resetState}>
                            Cancel
                        </Button>
                    </div>
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
        if (this.state.EditCommentIndex == -1 || indx != this.state.EditCommentIndex) {
            return (
                <Typography type="body1">
                    {this.props.comments[indx].commentContent}
                </Typography>
            );
        } else if (indx == this.state.EditCommentIndex) {
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
        if (this.state.EditCommentIndex == -1 || indx != this.state.EditCommentIndex) {
            return (
                <IconButton style={iconButtonStyle}>
                    <Icon style={iconStyle} onClick={() => this.setState({
                        EditCommentIndex: indx,
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
        if (this.state.EditCommentIndex == -1 || indx != this.state.EditCommentIndex) {
            if (!this.props.onCommentDelete)
                return undefined;
            return (
                <IconButton style={iconButtonStyle}>
                    <Icon style={iconStyle} onClick={() => this.DeleteComment(indx)}>delete</Icon>
                </IconButton>
            );
        }
        else {
            return (
                <div style={{textAlign: "left"}}>
                    <Button onClick={() => this.setState({EditCommentIndex: -1, commentContent: "", errorMsg: ""})}>
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
            this.props.onCommentUpdate(updatedComment);
            this.setState({EditCommentIndex: -1, commentContent: ""});
        }
        else {
            this.setState({errorMsg: "Cannot submit empty comment."});
        }
    };



    renderCommentActions = (commentBy: UserDto, commentIndex: number) => {
        if (this.props.user && this.props.user.username == commentBy.username && commentBy._id == this.props.user._id) {
            return (
                <div style={{float: "right"}}>
                    {this.EditAndSaveButton(commentIndex)}
                    {this.CancelAndDeleteButton(commentIndex)}
                </div>
            )
        }
        return undefined;
    };

    renderComments = () => {
        let comments: CommentDto[] = this.props.comments.slice(0, this.state.showMaxComments);
        //<div>Posted on {comment.commentedDate}</div>
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
                        posted on {comment.lastEditedUtc}
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
        if (this.props.loading === true)
            return <LoadingScreen size={100} padding={50}/>
        return (
            <div>
                <List className={"Comments"}>
                    {this.renderComments()}
                    {
                        this.props.comments.length > this.state.showMaxComments &&
                        <Button style={{width: "100%"}} onClick={this.onShowMore}>Show more comments</Button>
                    }
                </List>

                {
                    !this.state.inputMode &&
                    <div className={styleSheet.root}>
                        <Button raised
                                color="primary"
                                style={{float: "right",}}
                                onClick={() => this.setState({inputMode: !this.state.inputMode})}>
                            Comment
                        </Button>
                    </div>
                }
                {this.renderInputCommentBox()}
            </div>
        );
    }
}