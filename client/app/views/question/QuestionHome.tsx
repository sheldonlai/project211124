import {Component} from 'react';
import {Link} from 'react-router-dom';
import {Routes} from '../../constants/Routes';
import * as React from 'react';
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {QuestionReducerState} from "../../reducers/QuestionReducer";
import {QuestionPreview} from "../../../../server/dtos/q&a/QuestionPreview";
import {ErrorReducerState} from "../../reducers/ErrorReducer";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {convertFromRaw} from "draft-js";
import {CustomCard} from "../../components/CardComponent/CardComponent";
import {CustomLink} from "../../components/CustomLink";
import Button from "material-ui/Button";

export interface QuestionViewProps extends QuestionReducerState {
    loggedIn: boolean;
    globalError: ErrorReducerState;
    fetchQuestion: () => void;
}

class QuestionView extends Component<QuestionViewProps, any> {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props);
        if ((this.props.featuredQuestions.length === 0 || this.props.lastUpdated - Date.now() > 300000))
            this.props.fetchQuestion()
    }

    featuredQuestions = () => {
        return this.props.featuredQuestions ?
            this.props.featuredQuestions.map((e: QuestionPreview) => {
                    if (!e.content.entityMap) e.content.entityMap = {};
                    const content = convertFromRaw(e.content);
                    const text = content.getPlainText();
                    return (
                        <div key={e.title} style={{marginTop: 16}}>
                            <CustomLink to={Routes.question_by_title.replace(':title', e.title)}>
                                <CustomCard
                                    title={e.title}
                                    content={text}
                                    date={e.createdUtc}
                                />
                            </CustomLink>
                        </div>
                    )
                }
            ) : undefined;
    };

    createQuestionButton = () => {
        if (this.props.loggedIn)
            return <CustomLink to={Routes.createQuestion}><Button raised color="primary">Make new question</Button></CustomLink>;
        return undefined;
    };

    render() {
        return (
            <div>
                {this.createQuestionButton()}
                {this.featuredQuestions()}
            </div>
        )
    }
}

export const QuestionHomePage = AnimatedWrapper(connect(
    (state: AppStoreState) => ({
        loggedIn: state.auth.loggedIn,
        globalError: state.errors,
        ...state.question
    }),
    (dispatch) => ({
        fetchQuestion: () => dispatch(QuestionActions.getQuestionPreviews())
    })
)(QuestionView));