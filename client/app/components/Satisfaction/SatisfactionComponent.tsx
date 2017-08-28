import * as React from "react";
import IconButton from "material-ui/IconButton";
import Icon from 'material-ui/Icon';
import Grid from "material-ui/Grid"

interface props {
    readonly?: boolean;
    satisfy: boolean;
    onSatisfyClick?: () => void;
    onNotSatisfyClick?: () => void;
}

export class SatisfactionComponent extends React.Component<props> {
    render() {
        const neutralColor = this.props.satisfy === false ? "primary" : "action";
        const satisfyColor = this.props.satisfy === true ? "primary" : "action";

        return (
            <div style={{display: "inline-block"}}>
                <div>
                    {this.props.readonly ?
                        <div style={{height: 48}}>
                            <span >
                                <Icon style={{padding: 12}} color={neutralColor}>sentiment_neutral</Icon>
                            </span>
                            <span >
                                <Icon style={{padding: 12}} color={satisfyColor}>sentiment_very_satisfied</Icon>
                            </span>
                        </div> :
                        <div>
                            <IconButton onClick={this.props.onNotSatisfyClick}>
                                <Icon color={neutralColor}>sentiment_neutral</Icon>
                            </IconButton>
                            <IconButton onClick={this.props.onSatisfyClick}>
                                <Icon color={satisfyColor}>sentiment_very_satisfied</Icon>
                            </IconButton>
                        </div>
                    }
                </div>


            </div>
        )
    }
}