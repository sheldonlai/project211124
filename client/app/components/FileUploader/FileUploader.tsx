import * as React from "react";
import {CSSProperties} from "react";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import "./file-uploader.css";

const styles: { [key: string]: CSSProperties } = {
    input: {
        width: 1,
        height: 1,

        opacity: 0,
        overflow: "hidden",
        position: "absolute",
        zIndex: -1,
    },
    container: {
        backgroundColor: "#eeeeee",
        width: 200,
    }
}

export interface FileUploaderState {
    files: File[];
}

export class FileUploader extends React.Component<any, FileUploaderState> {
    state = {
        files: []
    };

    handleClick = () => {
        let input: HTMLInputElement = this.refs.input as any;
        input.click();
    };

    onInputChange = () => {
        let input: HTMLInputElement = this.refs.input as any;
        console.log(input.files);
        let files = [...this.state.files];
        if (input.files !== null) {
            for (let i = 0; i < input.files.length; i++) {
                files.push(input.files[i]);
                console.log(input.files[i])
            }
        }
        this.setState({files});
    };

    onDrop(files) {
        this.setState({
            files
        });
    }

    render() {
        let list = [];
        if (this.state.files) {
            for (let file of this.state.files) {
                list.push(
                    <ListItem button key={file.name}>
                        <ListItemText inset primary={file.name} secondary={file.size} />
                    </ListItem>
                )
            }
        }

        return (
            <div style={{width: 400, yOverflow: "hidden"}}>
                <input ref="input" style={styles.input} type="file" onChange={this.onInputChange} multiple />
                <div>
                    <Button color="primary" onClick={this.handleClick}>
                        Choose Files
                    </Button>
                    <Button raised color="primary" onClick={this.handleClick}>
                        Upload
                    </Button>
                </div>
                <div>
                    <List>
                        {list}
                    </List>
                </div>

            </div>
        )
    }
}