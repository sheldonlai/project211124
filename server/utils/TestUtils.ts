/**
 * Created by SHELDON on 7/1/2017.
 */
import {ContentState, convertToRaw, EditorState} from "draft-js";
export const createRawDraftContentState = (str?: string) => {
    if (str) {
        return convertToRaw(EditorState.createWithContent(ContentState.createFromText(str))
            .getCurrentContent());
    }
    return convertToRaw(EditorState.createEmpty().getCurrentContent());
};