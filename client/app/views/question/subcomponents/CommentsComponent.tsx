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

export interface CommentsComponentProps {
    comments: CommentDto[];
    user : UserDto;
    onCommentsSubmit : (comments: CommentDto[]) => void;
}

export interface CommentsComponentState {
    inputMode: boolean;
    commentContent: string;
    errorMsg: string;
}

const styleSheet: CSSProperties = {
    root: {
        width: '100%',
        maxWidth: '360px'
    }
};

export class CommentsComponent extends React.Component<CommentsComponentProps, CommentsComponentState> {
    constructor(props) {
        super (props);
        this.state = {
            inputMode: false,
            commentContent: "",
            errorMsg: "",
        };
    }


    addNewComment = () => {
        if(this.state.commentContent){
            this.setState({errorMsg: ""});

        }
        else{
            this.setState({errorMsg: "Cannot submit empty comment."});
        }
    }

    onCommentChange = (event)  => {
        this.setState({commentContent: event.target.value});
    }

    onErrMsg = () => {
        if(this.state.errorMsg != ""){
            return(
                <p><mark>{this.state.errorMsg}</mark></p>
            )
        }
    }

    renderInputCommentBox() {
        if (this.state.inputMode) {
            return (
                <div>
                    {this.onErrMsg()}
                    <form>
                        <textarea rows={4} cols={50} value={this.state.commentContent} onChange={this.onCommentChange}></textarea>
                    </form>
                    <Button raised color="primary" className={styleSheet.root} onClick={this.addNewComment}>
                        Submit
                    </Button>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <List className={"Comments"}>
                    <ListItem button>
                        <ListItemText primary="Inbox"/>
                    </ListItem>
                    <Divider light/>
                    <ListItem button>
                        <ListItemText primary="Drafts"/>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Trash"/>
                    </ListItem>
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