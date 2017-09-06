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
            <div style={{display: "inline-block", paddingTop: 5}}>
                <IconButton onClick={this.props.onClick} style={{height: 24}}>
                    <Icon>{this.props.thumbUp? "thumb_up": "thumb_down"}</Icon>
                    <span style={{marginLeft: 5, fontSize:14}}>{this.props.value}</span>
                </IconButton>
            </div>
        );
    }
}