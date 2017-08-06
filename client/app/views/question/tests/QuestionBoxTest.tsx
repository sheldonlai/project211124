import {QuestionBoxComponent} from "../subcomponents/QuestionBoxComponent";
import * as React from "react";
import * as renderer from 'react-test-renderer';
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {UserTypeEnum} from "../../../../../server/enums/UserTypeEnum";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import Question = FrontEndQuestionModels.Question;
import {Route, Router, withRouter} from "react-router";
import {RouterController} from "../../../api.controllers/RouterController";
import {MuiThemeProvider} from "material-ui/styles";
test('render question', () => {
    let user: UserDto = {
        _id: "something",
        company: undefined,
        email: "sheldon@email.com",
        points: 0,
        role: UserTypeEnum.NORMAL,
        university: undefined,
        username: "sheldon",
        verified: true,
        country: undefined
    };
    const functionStub = () => {
    };
    let questionStub: Question = new Question();
    questionStub.author = user;
    let propsStub = {
        user: user,
        question: questionStub,
        questionEditorState: questionStub,
        edit: true,
        upVoteQuestion: functionStub,
        downVoteQuestion: functionStub,
        editQuestion: functionStub,
        changeQuestionEditorState: functionStub,
        createComment: functionStub,
        UpdateComment: functionStub,
    };

    const component = renderer.create(
        <MuiThemeProvider>
        <Router history={RouterController.history}>
            <Route render={(props) => {
                return <QuestionBoxComponent {...propsStub} {...props} />
            }} />
        </Router>
        </MuiThemeProvider>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});