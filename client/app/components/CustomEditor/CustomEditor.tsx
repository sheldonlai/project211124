import {ContentState, convertFromRaw, convertToRaw, DraftEntityType, Editor, EditorState, RichUtils} from "draft-js";
import * as React from "react";
// import FormatBold from "material-ui/svg-icons/editor/format-bold";
import "draft-js/dist/Draft.css";
import "./custom_editor.css";

export interface CustomEditorProps {
    value: string;
    readOnly?: boolean;
    onChange: (text) => void;
    height?: number;
}

export class CustomEditor extends React.Component<CustomEditorProps, { editorState: EditorState }> {
    constructor(props) {
        super(props);
        let content;
        if (!this.props.value ||  typeof this.props.value === "string") {
            content = ContentState.createFromText(this.props.value);
        } else {
            content = convertFromRaw(this.props.value);
        }
        const editorState = EditorState.createWithContent(content);
        this.state = {
            editorState: editorState
        };
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    onChange = (editorState: EditorState) => {
        this.setState({editorState});
        // TODO: support other formatting, currently only uses plain text
        let content = editorState.getCurrentContent();
        // let block = content.getBlockMap();
        // let entity = content.getEntityMap();
        // console.log(text)
        // console.log(block.toObject())
        // console.log(entity)
        this.props.onChange(convertToRaw(content));
    };

    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    };

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

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
                    editorState={this.state.editorState}
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