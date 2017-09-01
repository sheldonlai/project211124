import * as React from "react";
import * as renderer from 'react-test-renderer';
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {UserTypeEnum} from "../../../../../server/enums/UserTypeEnum";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import {Route, Router} from "react-router";
import {RouterController} from "../../../api.controllers/RouterController";
import {createMuiTheme, MuiThemeProvider} from "material-ui/styles";
import {CommentDto} from "../../../../../server/dtos/q&a/CommentDto";
import {AnswerBoxesComponent} from "../subcomponents/AnswerBoxesComponent";
import Question = FrontEndQuestionModels.Question;


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
    answers: [],
    editAnswer: functionStub,
    addAnswer: functionStub,
    /*
    * user: UserDto
    question: Question;
    answers: Answer[];
}

interface DispatchToProps {
    editAnswer: (answer: Answer) => void;
    addAnswer: (answer: Answer) => void;*/
};
describe('answer boxes tests', function () {
    test('render question logged in', () => {
        const component = renderer.create(
            <MuiThemeProvider theme={muiTheme}>
                <Router history={RouterController.history}>
                    <Route render={(props: any) => {
                        return <AnswerBoxesComponent {...propsStub} {...props} />
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
                        return <AnswerBoxesComponent {...propsStub} {...props} />
                    }}/>
                </Router>
            </MuiThemeProvider>);

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
})
