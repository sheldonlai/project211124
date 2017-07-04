import {ContentBlock, Editor, EditorState, RichUtils} from "draft-js";
import * as React from "react";
import "draft-js/dist/Draft.css";
import {CSSProperties} from "react";
import {applyStylesToDefaultStyle} from "../../utils/utils";

export interface CustomEditorProps {
    value: EditorState;
    readOnly?: boolean;
    onChange: (text: EditorState) => void;
    height?: number;
    border?: boolean;
    style?: CSSProperties;
}

const style = {
    border: "1px #ececec solid",
    marginTop: "10px",
    marginBottom: "10px",
    minHeight: 150,
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

    onEditorClick = () => {
        const editor: Editor = this.refs.editor as any;
        editor.focus();
    }

    render() {
        let modifiedStyle = {...style};
        if (this.props.border === false)
            delete modifiedStyle.border;
        applyStylesToDefaultStyle(modifiedStyle, this.props.style);

        modifiedStyle['height'] = this.props.height ? this.props.height : undefined;
        return (
            <div style={modifiedStyle} onClick={this.onEditorClick}>
                <Editor
                    ref="editor"
                    editorState={this.props.value}
                    handleKeyCommand={this.handleKeyCommand}
                    readOnly={this.props.readOnly}
                    onChange={this.onChange}
                    blockStyleFn={this.myBlockStyleFn}
                />
            </div>
        );
    }
}