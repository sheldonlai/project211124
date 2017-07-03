import {ContentBlock, Editor, EditorState, RichUtils} from "draft-js";
import * as React from "react";
import "draft-js/dist/Draft.css";

export interface CustomEditorProps {
    value: EditorState;
    readOnly?: boolean;
    onChange: (text: EditorState) => void;
    height?: number;
    border?: boolean;
}

const style = {
    border: "1px #ececec solid",
    marginTop: "10px",
    marginBottom: "10px"
};

export class CustomEditor extends React.Component<CustomEditorProps> {
    constructor(props) {
        super(props);
    }

    onChange = (editorState: EditorState) => {
        this.props.onChange(editorState);
    };

    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.props.value, 'BOLD'));
    };

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.props.value, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };


    myBlockStyleFn = (contentBlock: ContentBlock) => {
        // const type = contentBlock.getType();
        return '';
    };

    render() {
        let modifiedStyle = {...style};
        if (this.props.border === false)
            delete modifiedStyle.border;
        modifiedStyle['height'] = this.props.height? this.props.height: 150;
        return (
            <div>
                <div>

                </div>
                <div style={modifiedStyle}>
                    <Editor
                        editorState={this.props.value}
                        handleKeyCommand={this.handleKeyCommand}
                        readOnly={this.props.readOnly}
                        onChange={this.onChange}
                        blockStyleFn={this.myBlockStyleFn}
                    />
                </div>
            </div>
        );
    }
}