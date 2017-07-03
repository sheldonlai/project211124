import * as React from "react";
import TextField from "material-ui/TextField";

export interface EditableMultiPurposeHeaderProps {
    editMode: boolean;
    value: string;
    onEditClick? : ()=> void;
    onTitleChange? : (event)=>void;
}

const headerStyle = {
    margin: "10px 0px",
    display: "inline-block"
};

export class EditableMultiPurposeHeader extends React.Component<EditableMultiPurposeHeaderProps>{
    render() {
        if (this.props.editMode){
            return (
                <TextField label="Title" value={this.props.value}
                           onChange={this.props.onTitleChange} style={{width: "100%"}}/>
            )
        } else {
            return (<h3 style={headerStyle}>{this.props.value}</h3>);
        }
    }
}