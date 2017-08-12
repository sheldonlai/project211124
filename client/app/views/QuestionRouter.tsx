import * as React from "react";
import {Route} from "react-router";
import {Routes} from "../constants/Routes";
import TransitionGroup =require('react-transition-group/TransitionGroup');
import {QuestionHomePage} from "./question/QuestionHome";
import {CreateQuestionPage} from "./question/CreateQuestion";
import {QuestionPageView} from "./question/QuestionPage";

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

export const QuestionRouter = () => (
    <div>
        <Route exact path={Routes.questionHome}
               render={({match, ...rest}) => (
                   <TransitionGroup component={firstChild}>
                       <QuestionHomePage match={match} {...rest} />
                   </TransitionGroup>
               )}
        />
        <Route exact path={Routes.createQuestion}
               render={({match, ...rest}) => (
                   <TransitionGroup component={firstChild}>
                       <CreateQuestionPage match={match} {...rest} />
                   </TransitionGroup>
               )}
        />
        <Route exact path={Routes.question_by_id}
               render={({match, ...rest}) => (
                   <TransitionGroup component={firstChild}>
                       <QuestionPageView match={match} {...rest} />
                   </TransitionGroup>
               )}
        />
    </div>
);

export default QuestionRouter;