
import * as React from "react";
import Typography from "material-ui/Typography";
import {convertDateTimeToString, convertDateToString} from "../../utils/DateUtils";
import {USERNAME_COLOR} from "../../styles/Colors";



interface props {
    by: string;
    date?: Date;
    dateType?: "date" | "datetime";
}

export class FooterComponent extends React.Component<props> {

    dateConverter : (date: Date| string) => string;
    componentWillMount() {
        this.dateConverter = (this.props.dateType === 'datetime')? convertDateTimeToString: convertDateToString;
    }

    render() {
        return(
            <div style={{textAlign: "right", paddingTop: 5}}>
                {" – "}
                <Typography style={{color: USERNAME_COLOR , display: "inline-block"}}>
                    {this.props.by}
                </Typography>
                <Typography type="caption" style={{display: "inline-block", marginLeft: 5 }}>
                    {this.props.date && <div>{this.dateConverter(this.props.date)}</div>}
                </Typography>
            </div>
        )
    }
}