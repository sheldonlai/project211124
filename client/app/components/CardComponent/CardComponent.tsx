import * as React from "react";
import {createStyleSheet, withStyles} from "material-ui/styles";
import Card, {CardActions, CardContent} from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import {convertDateTimeToString, convertDateToString} from "../../utils/DateUtils";
import {CSSProperties} from "react";
import Paper from "material-ui/Paper/Paper";
import {PRIMARY_COLOR} from "../../views/router";
import Grid from "material-ui/Grid/Grid";
import {AuthorLink} from "../RoutingComponents/AuthorLink";

export interface CardComponentProps {
    title: string;
    date: Date;
    authorName?:string;
    content: string;
    onClick?: () => void;
    wide?: boolean;
}

const cardStyle = {
    height: 124,
    overflowY: "hidden",
    position: "relative",
    //background:"linear-gradient(transparent 150px, white)"
    borderBottom: "#eee 1px solid",
    // background : "#f9f9f9"
};

const shader: CSSProperties = {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
};

export class CustomCard extends React.Component<CardComponentProps, any> {

    constructor(props) {
        super(props);
    }

    render() {
        const width = this.props.wide ? 500 + 16 : 250;
        let dateString;
        try {
            dateString = convertDateToString(this.props.date);
        } catch (err) {
            console.error(err);
        }
        return (
            <div>
                <Paper style={{width: width, ...cardStyle}} elevation={0}>
                    {/*<div style={shader}/>*/}
                    <div style={{height: 88, overflowY: "hidden"}}>
                        <Typography type="headline" style={{fontSize: 18, fontWeight: 500, lineHeight: "20px"}}>
                            {this.props.title}
                        </Typography>
                        <Grid container spacing={0}>
                            {
                                this.props.authorName &&
                                <Grid item style={{marginRight: 5}}>
                                    <AuthorLink fontSize={12} username={this.props.authorName}/>
                                </Grid>
                            }
                            <Grid item>
                                <Typography type="body1" style={{fontSize: 11}} color="secondary">
                                    {dateString}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography type="body1" paragraph={true} noWrap={true} style={{fontSize: 12}}>
                            {this.props.content}
                        </Typography>
                    </div>
                    <div style={{height: 36, textAlign: "right"}}>
                        <Button dense color="accent" onClick={this.props.onClick}>Read More</Button>
                    </div>
                </Paper>
            </div>
        );
    }
}