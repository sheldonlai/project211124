import * as React from "react";
import * as Dropzone from "react-dropzone";
import Typography from "material-ui/Typography/Typography";
import {Config} from "../../constants/configs";
import {FileUploadRecordDto} from "../../../../server/dtos/sharedDtos/FIleUploadRecordDto";
import Dialog from "material-ui/Dialog";
import Button from "material-ui/Button/Button";
import CircularProgress from "material-ui/Progress/CircularProgress";
import DialogTitle from "material-ui/Dialog/DialogTitle";
import DialogContent from "material-ui/Dialog/DialogContent";
import DialogContentText from "material-ui/Dialog/DialogContentText";

interface props {
    onFieldUploaded: (file: FileUploadRecordDto) => void;
}

interface state {
    uploadProgress: number;
    file: FileUploadRecordDto;
    open: boolean;
}

const dropZoneStyle = {
    borderRadius: 2,
        border: 4,
        borderColor: 'coral',
        borderStyle: 'dashed',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'table',
};

export class SimpleUploader extends React.Component<props, state> {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            file: undefined,
            uploadProgress: 0
        };
    }

    updateProgress = (evt) => {
        if (evt.lengthComputable) {
            let percentComplete = Math.floor((evt.loaded / evt.total) * 100);
            this.setState({uploadProgress: percentComplete});
        } else {
            this.setState({uploadProgress: 1});
        }
    };

    onDrop = (files) => {
        let data = new FormData();
        files.forEach((file: File) => {
            data.append("files", file);
        });
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('progress', this.updateProgress, false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this.setState({
                    uploadProgress: 0,
                    file: xhr.response,
                    open: false
                });
                console.log(xhr.response);
                this.props.onFieldUploaded(xhr.response[0]);
            }
        };

        xhr.responseType = "json";
        xhr.open('post', '/api/upload', true);
        xhr.setRequestHeader("Authorization", "Token " + localStorage.getItem(Config.tokenKey));
        xhr.send(data);
    };

    render() {
        if (!this.state.open)
            return <Button raised style={{textTransform: "none"}} onClick={() => this.setState({open: true})}>
                Upload
            </Button>
        return <Dialog open={this.state.open} maxWidth="md" onRequestClose={() => this.setState({open: false})}>
            <DialogTitle>{"Uploader"}</DialogTitle>
                <div style={{width: 500}}>
                    {
                        this.state.uploadProgress === 0 &&
                        <table style={{
                            borderSpacing: 10,
                            height: 250,
                            width: '100%',
                            overflow: 'auto',
                        }}>
                            <tbody>
                            <tr>
                                <td>
                                    <Dropzone
                                        multiple={false}
                                        accept="image/jpeg, image/png"
                                        maxSize={60000000}
                                        style={dropZoneStyle}
                                        onDrop={this.onDrop}
                                    >
                                        <Typography color="secondary" style={{padding: 20}}>
                                            Drag files here or click to upload
                                        </Typography>
                                    </Dropzone>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    }
                    {
                        this.state.uploadProgress !== 0 &&
                        <CircularProgress
                            size={150}
                            mode="determinate"
                            value={this.state.uploadProgress}
                        />
                    }
                </div>
        </Dialog>
    }
}