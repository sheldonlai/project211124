import * as React from "react";
import {Route} from "react-router";
import {Routes} from "../../constants/Routes";
import TransitionGroup =require('react-transition-group/TransitionGroup');
import {StoryHome, StoryHomeComponent} from "./StoryHome";
import {CreateStoryView} from "./CreateStoryView";

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

export const StoryRouter = () => (
    <div>
        <Route exact path={Routes.story}
               render={({match, ...rest}) => (
                   <TransitionGroup component={firstChild}>
                       <StoryHome match={match} {...rest} />
                   </TransitionGroup>
               )}
        />
        <Route exact path={Routes.createStory}
               render={({match, ...rest}) => (
                   <TransitionGroup component={firstChild}>
                       <CreateStoryView match={match} {...rest} />
                   </TransitionGroup>
               )}
        />
    </div>
);

export default StoryRouter;