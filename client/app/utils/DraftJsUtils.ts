import {convertFromRaw, convertToRaw, EditorState, RawDraftContentState} from "draft-js";

export const convertRawToEditorState = function(rawState: RawDraftContentState): EditorState {
    if (!rawState.entityMap) rawState.entityMap = {};
    const content = convertFromRaw(rawState);
    return EditorState.createWithContent(content);
};

export const convertRawToText = function(rawState: RawDraftContentState): string {
    if (!rawState.entityMap) rawState.entityMap = {};
    const content = convertFromRaw(rawState);
    return content.getPlainText();
};

export const convertEditorStateToRaw = function(editorState: EditorState): RawDraftContentState {
    let content = editorState.getCurrentContent();
    return convertToRaw(content);
};