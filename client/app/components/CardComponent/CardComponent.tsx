import * as React from "react";
import {createStyleSheet, withStyles} from "material-ui/styles";
import Card, {CardActions, CardContent} from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import {convertDateTimeToString, convertDateToString} from "../../utils/DateUtils";

const styleSheet = createStyleSheet('SimpleCard', theme => ({
    card: {
        height: 200,
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
        fontSize: 10,
        color: theme.palette.text.secondary,
    },
    shader: {
        content: '',
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        background: "linear-gradient(transparent 150px, white 175px)",
    }
}));


export interface CardComponentProps {
    classes: any;
    title: string;
    date: Date;
    content: string;
    onClick?: () => void;
    wide?: boolean;

}

export class CardComponent extends React.Component<CardComponentProps, any> {

    constructor(props) {
        super(props);
    }

    render() {
        const classes = this.props.classes;
        const width = this.props.wide? 500 + 16 : 250;
        console.log(this.props);
        let dateString
        try {
            dateString = convertDateTimeToString(this.props.date);
        } catch (err ){
            console.error(err);
        }
        return (
            <div>
                <Card className={classes.card} style={{width: width}}>
                    <div className={classes.shader}/>
                    <CardContent>
                        <Typography type="headline" style={{fontSize: 18}}>
                            {this.props.title}
                        </Typography>
                        <Typography type="body1" className={classes.pos}>
                            {dateString}
                        </Typography>
                        <Typography type="body1"  style={{height: 150, fontSize: 12}}>
                            {this.props.content}
                        </Typography>
                    </CardContent>
                    <CardActions style={{position: "absolute", bottom: 0, right: 0, height: 36}}>
                        <Button dense color="primary" onClick={this.props.onClick}>Read More</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export const CustomCard = withStyles(styleSheet)(CardComponent);