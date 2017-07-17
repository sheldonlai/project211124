// import * as React from "react";
// import Button from "material-ui/Button";
// import {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
// import axios from "axios";
//
// export interface FileUploaderState {
//     files: File[];
// }
//
// export class FileUploader extends React.Component<any, FileUploaderState> {
//     dropzone;
//
//     constructor() {
//         super();
//         this.state = {
//             files: []
//         };
//     }
//
//     onDrop(files) {
//         this.setState({files: files});
//     }
//
//     submit = () => {
//         let data = new FormData();
//         console.log(this.state);
//         this.state.files.forEach((file: File)=> {
//             data.append("files", file);
//         });
//
//         const config = {
//             headers: { 'content-type': 'multipart/form-data' }
//         };
//         axios.post('/api/upload', data, config)
//     };
//
//
//     componentDidMount () {
//         let Dropzone = require('dropzone');
//         Dropzone.autoDiscover = false;
//
//         var previewNode = document.querySelector("#template");
//         previewNode.id = "";
//         var previewTemplate = previewNode.parentElement.innerHTML;
//         previewNode.parentNode.removeChild(previewNode);
//
//         console.log(document.getElementById("dropzone"));
//         this.dropzone = new Dropzone(document.getElementById("dropzone"), { // Make the whole body a dropzone
//             url: "/target-url", // Set the url
//             thumbnailWidth: 80,
//             thumbnailHeight: 80,
//             parallelUploads: 20,
//             previewTemplate: previewTemplate,
//             autoQueue: false, // Make sure the files aren't queued until manually added
//             previewsContainer: "#previews", // Define the container to display the previews
//             clickable: true // Define the element that should be used as click trigger to select files.
//         });
//     }
//
//
//     render() {
//         return (
//             <div id="dropzone">
//             <div className="table table-striped files" id="previews">
//         <div id="template" className="file-row">
//         <div>
//             <span className="preview"><img data-dz-thumbnail /></span>
//         </div>
//         <div>
//             <p className="name" data-dz-name></p>
//         <strong className="error text-danger" data-dz-errormessage></strong>
//         </div>
//         <div>
//             <p className="size" data-dz-size></p>
//         <div className="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
//         <div className="progress-bar progress-bar-success" data-dz-uploadprogress></div>
//         </div>
//         </div>
//         <div>
//             <button className="btn btn-primary start">
//         <i className="glyphicon glyphicon-upload"></i>
//             <span>Start</span>
//             </button>
//             <button data-dz-remove className="btn btn-warning cancel">
//         <i className="glyphicon glyphicon-ban-circle"></i>
//             <span>Cancel</span>
//             </button>
//             <button data-dz-remove className="btn btn-danger delete">
//         <i className="glyphicon glyphicon-trash"></i>
//             <span>Delete</span>
//             </button>
//             </div>
//             </div>
//
//             </div>
//             </div>
//     );
//     }
//
// }