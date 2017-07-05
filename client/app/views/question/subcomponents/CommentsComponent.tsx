import * as React from "react";
import {CommentDto} from "../../../../../server/dtos/q&a/CommentDto";
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';


export interface CommentsComponentProps {
    onShowMore: () => void;
    comment_vector : CommentDto[];
}

const styleSheet = createStyleSheet('ListDividers', theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        background: theme.palette.background.paper,
    },
}));

export class CommentsComponent extends React.Component<CommentsComponentProps> {

    render() {
        return (
            <List className={"Comments"}>
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider light />
                <ListItem button>
                    <ListItemText primary="Drafts" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Trash" />
                </ListItem>
            </List>
        );
    }
}