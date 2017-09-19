import * as React from "react";
import {CSSProperties} from "react";
import Button from "material-ui/Button";
import {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
import * as Dropzone from "react-dropzone";
import Tabs, {Tab} from "material-ui/Tabs";
import Paper from "material-ui/Paper";
import {TableBody, TableCell, TableHead, TableRow} from "material-ui/Table";
import Dialog from "material-ui/Dialog";
import Grid from "material-ui/Grid";
import Card, {CardActions, CardContent, CardHeader, CardMedia} from "material-ui/Card";

import {CircularProgress} from "material-ui/Progress";
import {Config} from "../../constants/configs";

export interface FileUploaderProps {
    initialFiles: any[];
    onSelect: (filesSelected, filesUploaded) => void;
    onCancel: (filesUploaded) => void;
}

export interface FileUploaderState {
    index: number;
    isDialogOpened: boolean;
    filesSelected: any[]; // TODO: create a fileRecord model for client
    filesInGallery: any[];
    uploadProgress: number;  // Handle Progress properly(for each image)
}

const styles: CSSProperties = {
    dialog: {
        width: 600,
        margin: 0,
        padding: 0,
        overflow: 'hidden',
    },
    uploadContainer: {
        borderSpacing: 10,
        height: 250,
        width: '100%',
        overflow: 'auto',
    },
    uploadInnerContainer: {
        borderRadius: 2,
        border: 4,
        borderColor: 'coral',
        borderStyle: 'dashed',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'table',
    },
    message: {
        color: 'coral',
        textAlign: 'center',
        display: 'table-cell',
        verticalAlign: 'middle',
    },
    bottomBar: {
        borderTop: 1,
        borderStyle: 'solid',
        borderColor: '#e5e5e5',
    },
    buttonsWrapper: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 15,
        float: 'left',
    },
    warningWrapper: {
        borderSpacing: 15,
        overflow: 'auto',
    },
    warningMessage: {
        textAlign: 'center',
        color: '#aaa',
        fontSize: 13,
        paddingRight: 20,
        fontFamily: 'Roboto,Arial,sans-serif',
    },
    root: {
        padding: 20,
        height: 210,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'auto',
    },
    grid: {
        width: 560,
        height: 210,
    },
    image: {
        width: '100%',
        height: '100%',
    }
};

export class FileUploader extends React.Component<FileUploaderProps, FileUploaderState> {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            isDialogOpened: true,
            filesSelected: [],
            filesInGallery: props.initialFiles,
            uploadProgress: 0
        };
    };

    /* Dialog header */
    handleChange = (event, index) => {
        this.setState({index: index});
    };

    /* Dialog Body */
    renderUploader = () => {
        return <table style={styles.uploadContainer}>
            <tbody>
            <tr>
                <td>
                    <Dropzone
                        accept="image/jpeg, image/png"
                        style={styles.uploadInnerContainer}
                        maxSize={60000000}
                        onDrop={this.onDrop}
                    >
                        <span style={styles.message}>Drag files here or click to upload</span>
                    </Dropzone>
                </td>
            </tr>
            </tbody>
        </table>
    };

    renderGallery = () => {
        return <div style={styles.root}>
            <Grid container style={styles.grid} spacing={40}>
                {this.state.filesInGallery.map((file, index) => (
                    <Grid item xs={4} key={index}>
                        <div>
                            <Card onClick={(evt) => this.chooseFile(file, evt)}>
                                {/* TODO : card media image={file.fileURL}*/}
                                <CardMedia />
                                <CardContent style={{padding: 0, textAlign: 'center'}}>
                                   <span style={{
                                       color: '#222',
                                       fontSize: 13,
                                       width: '80%',
                                       display: 'inline-block',
                                       textAlign: 'center',
                                       whiteSpace: 'nowrap',
                                       fontFamily: 'Roboto,Arial,sans-serif',
                                       overflow: 'hidden',
                                       textOverflow: 'ellipsis'
                                   }}
                                   >
                                       {file.originalName}
                                   </span>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>))
                }
            </Grid>
        </div>
    };

    // renderSpinner = () => {
    //     if (this.state.uploadProgress > 0 && this.state.uploadProgress < 100) {
    //         return <Grid container justify="center" align="center" style={{height: "100%", width: "100%"}}>
    //             <Grid item>
    //                 <CircularProgress
    //                     size={150}
    //                     mode="determinate"
    //                     min={0}
    //                     max={100}
    //                     value={this.state.uploadProgress}
    //                 />
    //             </Grid>
    //         </Grid>
    //     }
    //     return;
    // };

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
                    uploadProgress: 100,
                    index: 1,
                    filesInGallery: xhr.response.concat(this.state.filesInGallery)
                });
            }
        };

        xhr.responseType = "json";
        xhr.open('post', '/api/upload', true);
        xhr.setRequestHeader("Authorization", "Token " + localStorage.getItem(Config.tokenKey));
        xhr.send(data);
    };

    updateProgress = (evt) => {
        if (evt.lengthComputable) {
            let percentComplete = Math.floor((evt.loaded / evt.total) * 100);
            this.setState({uploadProgress: percentComplete});
        } else {
            this.setState({uploadProgress: 1});
        }
    };

    chooseFile = (file, evt) => {
        let idx = this.state.filesSelected.indexOf(file);
        if (idx == -1) {
            evt.currentTarget.style.backgroundColor = 'lightsalmon';
            this.setState({filesSelected: this.state.filesSelected.concat(file)});
        } else {
            evt.currentTarget.style.backgroundColor = 'transparent';
            let arr = this.state.filesSelected;
            arr.splice(idx, 1);
            this.setState({filesSelected: arr});
        }
    };

    /* Dialog bottom bar */
    isSelectButtonDisabled = () => {
        return this.state.filesSelected.length === 0;
    };

    onSelect = () => {
        this.props.onSelect(this.state.filesSelected, this.state.filesInGallery);
        this.setState({isDialogOpened: false, filesSelected: []});
    };

    onCancel = () => {
        this.props.onCancel(this.state.filesInGallery);
        this.setState({isDialogOpened: false, filesSelected: []});
    };

    render() {
        return (
            <Dialog open={this.state.isDialogOpened}>
                <div style={styles.dialog}>
                    <div>
                        <Paper>
                            <Tabs
                                value={this.state.index}
                                onChange={this.handleChange}
                                indicatorColor={"primary"}
                                textColor={"primary"}
                            >
                                <Tab label="Upload"/>
                                <Tab label="Gallery"/>
                            </Tabs>
                        </Paper>
                    </div>
                    {this.state.index === 0 && this.renderUploader()}
                    {this.state.index === 1 && this.renderGallery()}
                </div>
                <div style={styles.bottomBar}>
                    <div style={styles.buttonsWrapper}>
                        <Button raised
                                color="primary"
                                disabled={this.isSelectButtonDisabled()}
                                onClick={this.onSelect}
                                style={{marginRight: 20}}>
                            Select
                        </Button>
                        <Button raised
                                style={{marginRight: 20}}
                                onClick={this.onCancel}>
                            Cancel
                        </Button>
                    </div>
                    <div>
                        <table style={styles.warningWrapper}>
                            <tbody>
                            <tr>
                                <td>
                                        <span style={styles.warningMessage}>File size cannot exceed 5mbs and must have extension
                                        .png, .jpg, or .pdf.
                                        </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Dialog>
        )
    }

}