import * as React from "react";
import {Component} from "react";
import {Routes} from "../../constants/Routes";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {QuestionHomeReducerState} from "../../reducers/QuestionHomeReducer";
import {ErrorReducerState} from "../../reducers/ErrorReducer";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from "material-ui/Card";
import {CustomCard} from "../../components/CardComponent/CardComponent";
import {CustomLink} from "../../components/CustomLink";
import Button from "material-ui/Button";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;

export interface QuestionViewProps extends QuestionHomeReducerState {
    loggedIn: boolean;
    globalError: ErrorReducerState;
    fetchQuestion: () => void;
}

class QuestionView extends Component<QuestionViewProps, any> {

    constructor(props) {
        super(props);
        console.log(this.props)
    }

    componentWillMount() {
        console.log(this.props);
        if ((this.props.featuredQuestions.length === 0 || this.props.lastUpdated - Date.now() > 300000))
            this.props.fetchQuestion()
    }

    featuredQuestions = () => {
        return this.props.featuredQuestions ?
            this.props.featuredQuestions.map((e: QuestionPreview) => {
                    return (
                        <div key={e.title} style={{marginTop: 16}}>
                            <CustomLink to={Routes.question_by_title.replace(':title', e.title)}>
                                <CustomCard
                                    title={e.title}
                                    content={e.content}
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