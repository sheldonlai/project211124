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
import {convertDateTimeToString} from "../../utils/DateUtils";
import Grid from "material-ui/Grid";
import {USERNAME_COLOR} from "../../styles/Colors";
import {AuthorLink} from "../RoutingComponents/AuthorLink";

export interface CommentsComponentProps {
    comments: CommentDto[];
    user: UserDto;
    onCommentCreate: (comment: CommentDto) => void;
    onCommentUpdate: (comment: CommentDto) => void;
    onCommentDelete?: (comment: CommentDto) => void;
    loading?: boolean;
}

export interface CommentsComponentState {
    newCommentMode: boolean;
    commentContent: string;
    errorMsg: string;
    EditCommentIndex: number;
    showMaxComments: number;
}

const styleSheet: CSSProperties = {
    root: {
        width: '100%',
        maxWidth: '360px',
        height: 36
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
            newCommentMode: false,
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
                createdUtc: new Date(Date.now()),
                commentBy: this.props.user,
                lastEditedUtc: new Date(Date.now()),
            };
            this.props.onCommentCreate(tmpComment);
            this.resetState();
        }
        else {
            this.setState({errorMsg: "Cannot submit empty comments."});
        }
    };

    resetState = () => {
        this.setState({
            commentContent: "",
            errorMsg: "",
            newCommentMode: false,
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

    renderNewCommentBox() {
        if (this.state.newCommentMode && this.state.EditCommentIndex === -1) {
            return (
                <div>
                    {this.onErrMsg()}
                    <form>
                        <TextField
                            style={{border: "1px lightgrey solid"}}
                            multiline rows={4}
                            value={this.state.commentContent}
                            fullWidth
                            placeholder="Type your comment here"
                            onChange={this.onCommentChange}/>
                    </form>
                    <div style={{height: 36, margin: "4px 0px"}}>
                        <Button
                            dense
                            style={{float: "right"}}
                            color="primary"
                            onClick={this.addNewComment}>
                            Submit
                        </Button>
                        <Button
                            dense
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

    DeleteComment = (index: number) => {
        this.props.onCommentDelete(this.props.comments[index]);
        this.props.comments.splice(index, 1);

    };

    renderCommentContent = (index: number) => {
        if (this.state.EditCommentIndex == -1 || index != this.state.EditCommentIndex) {
            return (
                <div style={{padding: 4}}>
                    <Typography style={{display: "inline-block"}}>
                        {this.props.comments[index].commentContent}
                    </Typography>
                    {" – "}
                    <AuthorLink username={this.props.comments[index].commentBy.username}/>
                    <Typography type="caption" style={{display: "inline-block", marginLeft: 5}}>
                        {convertDateTimeToString(this.props.comments[index].createdUtc)}
                    </Typography>

                </div>

            );
        } else if (index == this.state.EditCommentIndex) {
            return (
                <div style={{minHeight: 60}}>
                    <p>
                        <mark>{this.state.errorMsg}</mark>
                    </p>
                    <TextField defaultValue={this.props.comments[index].commentContent}
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

    EditAndSaveButton = (index: number) => {
        if (this.state.EditCommentIndex == -1 || index != this.state.EditCommentIndex) {
            return (
                <IconButton style={iconButtonStyle}>
                    <Icon style={iconStyle} onClick={() => this.setState({
                        EditCommentIndex: index,
                        commentContent: this.props.comments[index].commentContent,
                        errorMsg: ""
                    })}>mode_edit</Icon>
                </IconButton>
            );
        }
        else {
            return (
                <div style={{textAlign: "left"}}>
                    <Button dense color="primary"
                            onClick={() => this.UpdateEditedComment(this.props.comments[index]._id)}>save</Button>
                </div>
            );
        }
    };

    CancelAndDeleteButton = (index: number) => {
        if (this.state.EditCommentIndex == -1 || index != this.state.EditCommentIndex) {
            if (!this.props.onCommentDelete)
                return undefined;
            return (
                <IconButton style={iconButtonStyle}>
                    <Icon style={iconStyle} onClick={() => this.DeleteComment(index)}>delete</Icon>
                </IconButton>
            );
        }
        else {
            return (
                <div style={{textAlign: "left"}}>
                    <Button dense onClick={() =>
                        this.setState({EditCommentIndex: -1, commentContent: "", errorMsg: ""})}>
                        cancel
                    </Button>
                </div>
            );
        }
    };

    UpdateEditedComment = (commentId: string) => {
        if (this.state.commentContent) {
            let index: number = findIndex(this.props.comments, comment => comment._id == commentId);
            this.props.comments[index].commentContent = this.state.commentContent;
            this.props.comments[index].lastEditedUtc = new Date(Date.now());
            let updatedComment: CommentDto = this.props.comments[index];
            this.props.onCommentUpdate(updatedComment);
            this.setState({EditCommentIndex: -1, commentContent: ""});
        } else {
            this.setState({errorMsg: "Cannot submit empty comments."});
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
        if (this.props.comments.length == 0)
            return undefined;
        let comments: CommentDto[] = this.props.comments.slice(0, this.state.showMaxComments);
        return <List>
            {comments.map((comment, index) => {
                const showFooter = index != this.state.EditCommentIndex;
                return (
                    <div key={comment.lastEditedUtc + comment.commentBy.username}
                         style={{
                             marginLeft: 15, paddingLeft: 10, minHeight: 28, marginBottom: 2,
                             borderLeft: "1px lightblue solid", borderBottom: "1px #eeeeee solid"
                         }}>
                        <div>
                            <div style={{display: "inline-block", width: "80%"}}>
                                {this.renderCommentContent(index)}
                            </div>
                            {this.renderCommentActions(comment.commentBy, index)}
                        </div>
                    </div>
                )
            })}
            {   // show more comments button
                this.props.comments.length > this.state.showMaxComments &&
                <Button style={{width: "100%"}} onClick={this.onShowMore}>Show more comments</Button>
            }
        </List>
    };

    onShowMore = () => {
        this.setState({showMaxComments: this.props.comments.length + 1})
    };

    render() {
        if (this.props.loading === true)
            return <LoadingScreen size={100} padding={50}/>
        return (
            <Grid container justify="flex-end" spacing={0} style={{paddingLeft: 10, paddingRight: 10}}>
                <Grid item xs={12} style={{background: "white"}}>
                    {this.renderComments()}

                    {
                        !this.state.newCommentMode && this.props.user &&
                        <div style={{height: 36}}>
                            <Button dense
                                    color="accent"
                                    style={{float: "right"}}
                                    onClick={() => this.setState({newCommentMode: !this.state.newCommentMode})}>
                                Comment
                            </Button>
                        </div>
                    }
                    {this.renderNewCommentBox()}
                    {
                        this.props.user &&
                        <Divider light/>
                    }
                </Grid>
            </Grid>
        );
    }
}