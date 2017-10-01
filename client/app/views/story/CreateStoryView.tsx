import * as React from "react";
import {connect} from "react-redux";
import {Routes} from "../../constants/Routes";
import {AppStoreState} from "../../stores/AppStore";
import {RouteComponentProps} from "react-router";
import {FrontEndStoryModels} from "../../models/StoryModels";
import {StoryApiController} from "../../api.controllers/StoryApiController";
import {StoryEditor} from "./subcomponents/StoryEditor";
import Story = FrontEndStoryModels.Story;


interface state {
}

export class CreateStoryComponent extends React.Component<props, state> {

    constructor(props) {
        super(props);
        this.state = {
            story: new Story(),
            showFileUploadDialog: false,
            filesUploaded: []
        }
    }

    submit = (story) => {
          StoryApiController.createStory(story).then(() => {
              this.props.history.push(Routes.story);
          }).catch((err) => {
              console.error(err)
          })
    };

    render() {
        const inputContainer = {paddingLeft: 20, paddingRight: 20};
        const input = {width: "100%"};
        return (
            <StoryEditor story={new Story()} onSubmit={this.submit}/>
        );
    }
}

interface stateToProps {
}

interface dispatchProps {
}

interface props extends stateToProps, dispatchProps, RouteComponentProps<void> {
}

const mapStateToProps = (state: AppStoreState) => ({});

const mapDispatchToProps = (dispatch) => ({});

export const CreateStoryView = connect<stateToProps, dispatchProps, RouteComponentProps<void>>(
    mapStateToProps, mapDispatchToProps)(CreateStoryComponent);