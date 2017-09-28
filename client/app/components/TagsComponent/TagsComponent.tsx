import * as React from 'react';
import {Component} from 'react';
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import {ChipListComponent} from "../Forms/ChipListComponent";
import Typography from "material-ui/Typography/Typography";

export interface TagsSelectorProps {
    tags?: string[]; // used for suggestion
    selectedTags: string[];
    onChange: (tags: string[]) => void;
}
export interface TagsSelectorState {
    tag: string;
    error: string;
}
export class TagsSelector extends Component<TagsSelectorProps, TagsSelectorState> {

    constructor(props) {
        super(props);
        this.state = {
            tag : '',
            error: ''
        }
    }

    styles = {
        chip: {
            margin: 4,
        },
        wrapper: {
            display: 'flex',
            flexWrap: 'wrap',
        },
    };

    tagChange = (event) => {
        this.setState({ tag : event.target.value });
    };

    submit = (event) => {
        if (event.key === "Enter"){
            let newTag = this.state.tag.toLowerCase();
            if (newTag.length > 20){
                this.setState({error: 'Tags cannot have more than 20 characters.'});
                return;
            }
            let tags = [...this.props.selectedTags];
            tags.push(newTag);
            if (tags.length > 5) {
                this.setState({error: 'You cannot have more than 5 tags.'});
                return;
            }
            this.props.onChange(tags);
            this.setState({tag: '', error: ''});

        }
    };

    test = (array) => {
        this.props.onChange(array)
    };

    render() {
        return (
            <Grid>
                <Grid >
                    <ChipListComponent
                        chips={this.props.selectedTags}
                        handleRequestDelete={this.test}
                        style={this.styles.chip}
                    />
                </Grid>
                <Typography type="caption" style={{color: "red"}}>{this.state.error}</Typography>
                <TextField
                    label="Tag (enter to insert)"
                    type="text"
                    value={this.state.tag}
                    onChange={this.tagChange}
                    onKeyPress={this.submit}
                />
            </Grid>
        );
    }
}