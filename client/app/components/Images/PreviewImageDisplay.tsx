import * as React from "react";
import {FileUploadRecordDto} from "../../../../server/dtos/sharedDtos/FIleUploadRecordDto";
import Typography from "material-ui/Typography/Typography";

interface props {
    file : FileUploadRecordDto
}

export class PreviewImageDisplay extends React.Component<props> {
    render() {
        return <div style={{position: 'relative', width: "100%"}}>
            <img src={this.props.file.fileURL} style={{width: "100%"}}/>
            <div style={{position: 'absolute', bottom : 0}}>
                <Typography color="secondary">{this.props.file.fileName}</Typography>
            </div>
        </div>
    }

}