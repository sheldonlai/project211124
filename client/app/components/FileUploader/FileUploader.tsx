import * as React from "react";
import {CSSProperties} from "react";
import Button from "material-ui/Button";
import "./file-uploader.css";
const styles: { [key: string]: CSSProperties } = {
    input: {
        width: "100%",
        height: "100%",

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
    files: FileList;
}

export class FileUploader extends React.Component<any, FileUploaderState> {
    state = {
        files: undefined
    };

    handleClick = () => {
        let input: HTMLInputElement = this.refs.input as any;
        input.click();
    };

    onInputChange = () => {
        let input: HTMLInputElement = this.refs.input as any;
        console.log(input.files);
        this.setState({files: input.files});
    };

    render() {
        let list = [];
        if (this.state.files) {
            for (let file of this.state.files) {
                list.push(
                    <div>
                        name: {file.name}
                        <br />
                        size: {file.size}
                    </div>
                )
            }
        }

        return (
            <div style={styles.container}>
                <input ref="input" style={styles.input} type="file" onChange={this.onInputChange}/>
                <Button color="primary" onClick={this.handleClick}>
                    Choose Files
                </Button>
                {list}
            </div>
        )
    }
}