import * as React from "react";
import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const toolBarOptions = {
    options: ['inline', 'blockType', 'list', 'textAlign', 'image', 'link', 'history'],
    inline: { inDropdown: true },
    blockType: {
        inDropdown: true,
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
};

export class EditorFactory {

    public createRichEditor(onClick: () => void,
                            onChange: (editorState: EditorState) => void,
                            ref: string,
                            editorState: EditorState,
                            readOnly: boolean,
                            style: any) {
        if (readOnly) {
            return (
                <div>
                    <Editor
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        options={[]}
                        toolbarStyle={{height: 0}}
                        editorStyle={style}
                        editorState={editorState}
                        onEditorStateChange={onChange}
                        readOnly={true}
                        toolbarHidden={true}
                    />
                </div>
            );
        } else {
            return <div>
                <Editor
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorStyle={style}
                    editorState={editorState}
                    onEditorStateChange={onChange}
                    toolbar={toolBarOptions}
                />
            </div>
        }
    }

}
