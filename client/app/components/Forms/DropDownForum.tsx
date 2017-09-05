import * as React from 'react';
import {CSSProperties} from 'react';
import Menu, {MenuItem} from 'material-ui/Menu';
import {ListItem, ListItemText} from 'material-ui/List';
import Button from "material-ui/Button";
import Typography from 'material-ui/Typography';
import {ForumDto} from "../../../../server/dtos/sharedDtos/ForumDto";
import TextField from 'material-ui/TextField';

interface props {
    data: ForumDto[];
    onChange?: (element: any) => void;
    fullWidth? : boolean;
}

const textField = {
    marginLeft: 10,
    marginRight: 10,
    width: 200,
};

// Temporary component until Material UI finish implementing theirs
export class DropDownForum extends React.Component<props> {

    constructor(props) {
        super(props);
    }

    button = undefined;

    componentWillReceiveProps(nextProps) {
    }

    handleClick = (event) => {
        this.setState({open: true, anchorEl: this.refs.menuPlaceHolder});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    onSelectValue = (value: any) => {
        if (this.props.onChange)
            this.props.onChange(value);
        this.setState({open: false});
    };

    bodyContainer = (text: string, color?: string) => {
        color = color ? color : "default";
        return <Typography type="body1" color={color}>{text}</Typography>
    };

    render() {
        return (
            <form noValidate>
                {this.props.data.map((data) => {
                    return <TextField
                        style={textField}
                        key={data.FieldName}
                        label={data.FieldName}
                        placeholder={data.FieldName}
                        margin="normal"
                    />
                })}
            </form>
        )
    }
}
