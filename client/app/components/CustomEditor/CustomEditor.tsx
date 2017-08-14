import {Editor, EditorState} from "draft-js";
import * as React from "react";
import {CSSProperties} from "react";
import "draft-js/dist/Draft.css";
import {applyStylesToDefaultStyle} from "../../utils/utils";
import {EditorFactory} from "./EditorFactory";

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
    boxSizing: 'border-box',
    padding: 10,
    borderRadius: 2,
    boxShadow: 'inset 0px 1px 8px -3px #ABABAB',
    background: '#fefefe'
};

export class CustomEditor extends React.Component<CustomEditorProps> {
    constructor(props) {
        super(props);
    }

    onChange = (editorState: EditorState) => {
        this.props.onChange(editorState);
    };

    onEditorClick = () => {
        const editor: Editor = this.refs.editor as any;
        editor.focus();
    };

    render() {
        let modifiedStyle = {...style};
        if (this.props.border === false)
            delete modifiedStyle.border;
        applyStylesToDefaultStyle(modifiedStyle, this.props.style);
        //modifiedStyle['height'] = this.props.height ? this.props.height : undefined;

        const editorFactory = new EditorFactory();
        return editorFactory.createRichEditor(
            this.onEditorClick,
            this.onChange,
            "editor",
            this.props.value,
            this.props.readOnly,
            modifiedStyle
        );

    }
}