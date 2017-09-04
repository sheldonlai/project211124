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

const defaultStyles: CSSProperties = {
    width: 200,
    height: 35,
    justifyContent: "flex-start"
};

interface state {
    anchorEl: any;
    open: boolean;
}

// Temporary component until Material UI finish implementing theirs
export class DropDownForum extends React.Component<props, state> {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: undefined,
            open: false
        }
        console.log(this.props.data);
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
        let menuItemStyle = defaultStyles;
        let containerStyle: CSSProperties = {margin: "10px 0", width: 200};
        if (this.props.fullWidth === true) {
            menuItemStyle.width = "100%";
            containerStyle.width = "100%";
        }
        const border: CSSProperties = {borderBottom: "lightgrey 1px solid"};
        return (
            <div>
                {this.props.data.map((data) => {
                    return <TextField
                        key={data.FieldName}
                        label={data.FieldName}
                        placeholder={data.FieldName}
                        multiline
                    />
                })}
            </div>
        )
    }
}
