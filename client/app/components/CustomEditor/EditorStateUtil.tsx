import {EditorState, ContentState, Entity, AtomicBlockUtils} from "draft-js";
import * as React from "react";
import "draft-js/dist/Draft.css";

export class EditorStateUtil {

    public static insertImages(editorState: EditorState, imageSrcs: string[]): EditorState {
        let newEditorState = editorState;
        for (let src of imageSrcs) {
            newEditorState = EditorStateUtil.insertImage(newEditorState, src);
        }
        return newEditorState;
    }

    public static insertImage(editorState: EditorState, imageSrc: string): EditorState {
        let urlType = 'image';
        let contentState = editorState.getCurrentContent();
        let contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', { src: imageSrc });
        let entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        let newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
        return EditorState.forceSelection(newEditorState, editorState.getCurrentContent().getSelectionAfter());
    }

}