import {QuestionBoxComponent} from "../subcomponents/QuestionBoxComponent";
import * as React from "react";
import * as renderer from 'react-test-renderer';
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {UserTypeEnum} from "../../../../../server/enums/UserTypeEnum";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import Question = FrontEndQuestionModels.Question;
import {Route, Router, withRouter} from "react-router";
import {RouterController} from "../../../api.controllers/RouterController";
import {MuiThemeProvider, createMuiTheme} from "material-ui/styles";
import {CommentDto} from "../../../../../server/dtos/q&a/CommentDto";


jest.mock('draft-js/lib/generateRandomKey', () => () => '123');
jest.mock('../../../components/CustomEditor/EditorFactory');
const e = require("../../../components/CustomEditor/EditorFactory");
const mMock = jest.fn();
e.EditorFactory.mockImplementation(() => {
    return {
        createRichEditor: () => null
    }
});

let muiTheme = createMuiTheme();
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
    createComment: (c: CommentDto, id: string) => {
    },
    updateComment: (c: CommentDto, id: string) => {
    },
    deleteComment: (c: CommentDto, id: string) => {
    }
};

test('render question logged in', () => {


    const component = renderer.create(
        <MuiThemeProvider theme={muiTheme}>
            <Router history={RouterController.history}>
                <Route render={(props: any) => {
                    return <QuestionBoxComponent {...propsStub} {...props} />
                }}/>
            </Router>
        </MuiThemeProvider>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


test('render question box not logged in', () => {
    let tempPropsStub = propsStub;
    tempPropsStub.user = undefined;
    const component = renderer.create(
        <MuiThemeProvider theme={muiTheme}>
            <Router history={RouterController.history}>
                <Route render={(props: any) => {
                    return <QuestionBoxComponent {...propsStub} {...props} />
                }}/>
            </Router>
        </MuiThemeProvider>);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})