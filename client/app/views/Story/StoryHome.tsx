import * as React from "react";
import {CustomEditor} from "../../components/CustomEditor/CustomEditor";
import {EditorState} from "draft-js";
import {connect} from "react-redux";

export class StoryHomeComponent extends React.Component<any> {
    constructor(props){
        super();
    }

    render() {
        return <CustomEditor value={EditorState.createEmpty()} onChange={() => {}}/>
    }
}

const mapStateToProps = () => {

};

const mapDispatchToProps = (dispatch) => ({
    fetchStories: () => dispatch()
});

export const StoryHome = connect<any, any, any>(
    mapStateToProps, mapDispatchToProps)(StoryHomeComponent);