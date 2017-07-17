import * as React from "react";
import Button from "material-ui/Button";
import {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
import axios from "axios";
import * as Dropzone from 'react-dropzone'

export interface FileUploaderState {
    files: File[];
}

export class FileUploader extends React.Component<any, FileUploaderState> {

    constructor() {
        super();
        this.state = {
            files: []
        };
    }

    onDrop(files) {
        this.setState({files: files});
    }

    submit = () => {
        let data = new FormData();
        console.log(this.state);
        this.state.files.forEach((file: File)=> {
            data.append("files", file);
        });

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        axios.post('/api/upload', data, config)
    };

    render() {
        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <Button raised color="primary" onClick={this.submit}>Upload</Button>
                <aside>
                    <h2>Dropped files</h2>
                    <ul>
                        {
                            this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
                        }
                    </ul>
                </aside>
            </section>
        );
    }

}