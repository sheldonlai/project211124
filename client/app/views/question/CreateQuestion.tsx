import * as React from 'react';
import {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
let SelectField = require('material-ui/SelectField').default;

export class CreateQuestion extends Component<any, any> {
    constructor(props) {
        super(props);

    }

    reset = ()=> {
        this.setState({title: '', content: ''})
    }

    titleChange = (event : any, value: string)  => {
        this.setState({title : value});
    }

    contentChange = (event: any)  => {
        this.setState({content: event.target.value});
    }

    submit = () => {
        let postReq:  any = {
            title : this.state.title,
            content : this.state.content,
            tags: this.state.selectedFolders.map((folder : any)=> {
                return folder.folderName
            })
        }
        //
    }

    selectFieldChange = (event: any , index : number, value : any[]) => {
        this.setState({selectedFolders : value});
    }

    menuItems = () => {
        return this.props.tags.map((tag : any) => (
            <MenuItem
                key={tag.name}
                value={tag}
                primaryText={tag.folderName}
            />
        ));
    }

    folderMenu = () => {
        if (this.props.tags != null && this.props.folders.length > 0){
            return (<SelectField
                multiple={true}
                hintText="Select Folders"
                value={this.state.selectedFolders}
                onChange={this.selectFieldChange}
                fullWidth={true}>
                {this.menuItems()}
            </SelectField>)
        }
    }

    render() {
        let folderMenu;


        return (
            <div style={{textAlign: 'center'}}>
                <TextField
                    hintText="Title"
                    floatingLabelText="Title"
                    fullWidth={true}
                    value={this.state.title}
                    onChange={this.titleChange}
                />
                <div>{folderMenu}</div>
                <h4 style={{float: 'left'}}>Content :</h4>
                <textarea value={this.state.content} onChange={this.contentChange}
                          style={{minHeight : '400px', width : '100%'}}
                />
                <RaisedButton
                    label="Make Post"
                    onClick={this.submit}
                />
            </div>
        )
    }

}