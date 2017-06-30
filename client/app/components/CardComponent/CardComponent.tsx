import * as React from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('SimpleCard', theme => ({
    card: {
        width: 275,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
}));


export interface CardComponentProps {
    classes: any;
    title: string;
    date: Date;
    content: string;
    onClick?: ()=>void;
}

export class CardComponent extends React.Component<CardComponentProps, any> {
    constructor(props){
        super(props);
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography type="headline" component="h2">
                            {this.props.title}
                        </Typography>
                        <Typography type="body1" className={classes.pos}>
                            {this.props.date.toLocaleString()}
                        </Typography>
                        <Typography component="p">
                            {this.props.content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button dense onClick={this.props.onClick}>Read More</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export const CustomCard = withStyles(styleSheet)(CardComponent);