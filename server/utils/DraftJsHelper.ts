import {convertFromRaw, convertToRaw, EditorState, RawDraftContentState} from "draft-js";


export class DraftJsHelper {
    static convertRawToEditorState = function(rawState: RawDraftContentState): EditorState {
        if (!rawState.entityMap) rawState.entityMap = {};
        const content = convertFromRaw(rawState);
        return EditorState.createWithContent(content);
    };

    static convertRawToText = function(rawState: RawDraftContentState): string {
        if (!rawState.entityMap) rawState.entityMap = {};
        const content = convertFromRaw(rawState);
        return content.getPlainText();
    };

    static convertEditorStateToRaw = function(editorState: EditorState): RawDraftContentState {
        let content = editorState.getCurrentContent();
        return convertToRaw(content);
    };
}
