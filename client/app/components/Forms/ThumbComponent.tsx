import * as React from "react";
import IconButton from "material-ui/IconButton";
import Icon from 'material-ui/Icon';

interface props {
    onClick: () => void;
    value: string| number;
    thumbUp: boolean;
}

export class ThumbComponent extends React.Component<props> {


    render() {
        return (
            <div style={{display: "inline-block"}}>
                <IconButton onClick={this.props.onClick}>
                    <Icon>{this.props.thumbUp? "thumb_up": "thumb_down"}</Icon>
                    <span style={{marginLeft: 5, fontSize:14}}>{this.props.value}</span>
                </IconButton>
            </div>
        );
    }
}