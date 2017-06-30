import {ContentState, convertFromRaw, convertToRaw, DraftEntityType, Editor, EditorState, RichUtils} from "draft-js";
import * as React from "react";
// import FormatBold from "material-ui/svg-icons/editor/format-bold";
import "draft-js/dist/Draft.css";
import "./custom_editor.css";

export interface CustomEditorProps {
    value: EditorState;
    readOnly?: boolean;
    onChange: (text) => void;
    height?: number;
}

export class CustomEditor extends React.Component<CustomEditorProps, {}> {
    constructor(props) {
        super(props);
    }

    onChange = (editorState: EditorState) => {
        this.setState({editorState});
        let content = editorState.getCurrentContent();
        this.props.onChange(convertToRaw(content));
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

    myBlockStyleFn = (contentBlock) => {
        // const type = contentBlock.getType();
    };

    render() {
        // const styleMap = this.state.editorState.getCurrentInlineStyle().toObject();
        return (
            <div>
                <div>

                </div>
                <div style={{minHeight: 150}}>
                    <Editor
                        style={{minHeight: 200}}
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