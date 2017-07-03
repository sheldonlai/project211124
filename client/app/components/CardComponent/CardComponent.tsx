import * as React from "react";
import {createStyleSheet, withStyles} from "material-ui/styles";
import Card, {CardActions, CardContent} from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

const styleSheet = createStyleSheet('SimpleCard', theme => ({
    card: {
        width: 275,
        height: 300,
        yOverflow: "hidden",
        position: "relative",
        //background:"linear-gradient(transparent 150px, white)"
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
    shader: {
        content: '',
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        background: "linear-gradient(transparent 150px, white)",
    }
}));


export interface CardComponentProps {
    classes: any;
    title: string;
    date: Date;
    content: string;
    onClick?: () => void;
}

export class CardComponent extends React.Component<CardComponentProps, any> {
    render() {
        const classes = this.props.classes;
        return (
            <div>
                <Card className={classes.card}>
                    <div className={classes.shader}></div>
                    <CardContent>
                        <Typography type="headline" component="h2">
                            {this.props.title}
                        </Typography>
                        <Typography type="body1" className={classes.pos}>
                            {this.props.date.toLocaleString()}
                        </Typography>
                        <Typography component="p"
                                    style={{height: 150, color: "linear-gradient(transparent 150px, white)"}}>
                            {this.props.content}
                        </Typography>
                    </CardContent>
                    <CardActions style={{position: "absolute", bottom: 0, right: 0}}>
                        <Button dense onClick={this.props.onClick}>Read More</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export const CustomCard = withStyles(styleSheet)(CardComponent);