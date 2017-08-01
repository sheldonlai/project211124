import * as React from "react";
import {EditorState} from "draft-js";
import Editor, {composeDecorators} from "draft-js-plugins-editor";
import createImagePlugin from "draft-js-image-plugin";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";

import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });

const plugins = [
    blockDndPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin
];

export class EditorFactory {

    public createRichEditor(onClick: () => void,
                            onChange: (text: EditorState) => void,
                            ref: string,
                            editorState: EditorState,
                            readOnly: boolean,
                            style: any) {
        return <div style={style} onClick={onClick}>
                    <Editor editorState={editorState}
                            onChange={onChange}
                            plugins={plugins}
                            readOnly={readOnly}
                            ref="editor"
                    />
                    <AlignmentTool />
                 </div>;
    }

}