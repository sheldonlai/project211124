import * as React from "react";
import Input from "material-ui/Input/Input";
import IconButton from "material-ui/IconButton/IconButton";
import Icon from "material-ui/Icon/Icon";
import Typography from "material-ui/Typography/Typography";


interface props {
    value: string;
    onChange: (event: Event) => void;
    onAdvanceSearch : () => void;
    onSearch: () => void;
}

export class SearchBarComponent extends React.Component<props> {
    render() {
        return <div style={{position: "relative", width: "100%"}}>
            <Input
                label="Search..."
                placeholder="Search..."
                style={{width: "calc(100% - 48px)", fontSize: 24}}
                value={this.props.value}
                onChange={this.props.onChange}
                onKeyPress={(event) => {
                    if (event.key === "Enter"){
                        this.props.onSearch();
                    }
                }}
            />
            <IconButton onClick={this.props.onSearch}>
                <Icon>search</Icon>
            </IconButton>
            <Typography style={{cursor: "pointer"}} type="caption" align="justify"
                        onClick={this.props.onAdvanceSearch}>
                Advanced
            </Typography>
        </div>
    }
}