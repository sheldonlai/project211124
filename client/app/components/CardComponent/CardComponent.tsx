import * as React from "react";
import {createStyleSheet, withStyles} from "material-ui/styles";
import Card, {CardActions, CardContent} from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import {convertDateTimeToString, convertDateToString} from "../../utils/DateUtils";
import {CSSProperties} from "react";

export interface CardComponentProps {
    title: string;
    date: Date;
    content: string;
    onClick?: () => void;
    wide?: boolean;
}

const cardStyle = {
    height: 200,
    overflowY:"hidden",
    position: "relative",
    //background:"linear-gradient(transparent 150px, white)"
};

const shader : CSSProperties = {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    background: "linear-gradient(transparent 150px, white 175px)",
};

export class CustomCard extends React.Component<CardComponentProps, any> {

    constructor(props) {
        super(props);
    }

    render() {
        const width = this.props.wide? 500 + 16 : 250;
        console.log(this.props);
        let dateString;
        try {
            dateString = convertDateTimeToString(this.props.date);
        } catch (err ){
            console.error(err);
        }
        return (
            <div>
                <Card style={{width: width, ...cardStyle}}>
                    <div style={shader}/>
                    <CardContent>
                        <Typography type="headline" style={{fontSize: 18}}>
                            {this.props.title}
                        </Typography>
                        <Typography type="body1" style={{fontSize: 10}} color="secondary">
                            {dateString}
                        </Typography>
                        <Typography type="body1"  style={{fontSize: 12, overflowY:"hidden", height: 150}}>
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