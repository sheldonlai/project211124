import * as React from "react";
import {Route} from "react-router";
import {Routes} from "../../constants/Routes";
import TransitionGroup =require('react-transition-group/TransitionGroup');
import {StoryHome, StoryHomeComponent} from "./StoryHome";
import {CreateStoryView} from "./CreateStoryView";
import {StoryPageView} from "./StoryPage";

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

export const StoryRouter = () => (
    <div>
        <Route exact path={Routes.story}
               component={StoryHome}
        />
        <Route exact path={Routes.createStory}
               component={CreateStoryView}
        />
        <Route exact path={Routes.story_by_id} component={StoryPageView}/>
    </div>
);

export default StoryRouter;