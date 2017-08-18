import * as React from "react";
import {Route} from "react-router";
import {Routes} from "../../constants/Routes";
import {QuestionHomePage} from "./QuestionHome";
import {CreateQuestionPage} from "./CreateQuestion";
import {QuestionPageView} from "./QuestionPage";

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

export const QuestionRouter = () => (
    <div>
        <Route exact path={Routes.question} component={QuestionHomePage}
        />
        <Route exact path={Routes.createQuestion}
               component={CreateQuestionPage}
        />
        <Route exact path={Routes.question_by_id}
               component={QuestionPageView}
        />
    </div>
);

export default QuestionRouter;