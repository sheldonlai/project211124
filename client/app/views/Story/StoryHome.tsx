import * as React from "react";
import {CustomEditor} from "../../components/CustomEditor/CustomEditor";
import {EditorState} from "draft-js";

export class StoryHomeComponent extends React.Component<any> {
    constructor(props){
        super();
    }

    render() {
        return <CustomEditor value={EditorState.createEmpty()} onChange={() => {}}/>
    }
}