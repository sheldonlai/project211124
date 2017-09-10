import * as React from "react";
import {Component} from "react";
import {Routes} from "../../constants/Routes";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {QuestionHomeReducerState} from "../../reducers/QuestionHomeReducer";
import {ErrorReducerState} from "../../reducers/ErrorReducer";
import {CardText, CardTitle} from "material-ui/Card";
import {CustomLink} from "../../components/RoutingComponents/CustomLink";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import {LoadingScreen} from "../../components/Animations/LoadingScreen";
import Typography from "material-ui/Typography";
import {PreviewCardsComponent} from "../../components/CardComponent/PreviewCardsComponent";
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton'
import {RawDraftContentState} from "draft-js";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {QuestionDifficulty} from "../../../../server/models/Question";
import {CategoryTypeEnum} from "../../../../server/enums/CategoryTypeEnum";
import {PRIMARY_COLOR} from "../router";
import Input from "material-ui/Input/Input";
import {SearchBarComponent} from "../../components/SearchBar/SearchBarComponent";

export interface QuestionViewProps extends QuestionHomeReducerState {
    loggedIn: boolean;
    globalError: ErrorReducerState;
    fetchQuestion: () => void;
}

interface state {
    SearchQuestionObj: {
        _id: string,
        title: string,
        author: UserDto,
        content: RawDraftContentState,
        //createdUtc: Date;
        tags: any[],
        difficulty: QuestionDifficulty,
        category: CategoryTypeEnum,
    };
    AdvancedSearch: boolean;
    SearchString: string;
}

class QuestionHomeComponent extends Component<QuestionViewProps, state> {
    constructor(props) {
        super(props);
        this.state = {
            SearchQuestionObj: {
                _id: "",
                title: "",
                author: undefined,
                content: undefined,
                //createdUtc: Date;
                tags: [],
                difficulty: undefined,
                category: undefined,
            },
            AdvancedSearch: false,
            SearchString: "",
        };
    }

    componentWillMount() {
        if ((this.props.featuredQuestions.length === 0 || this.props.lastUpdated - Date.now() < 1000))
            this.props.fetchQuestion();
    }

    renderSearchBar = () => {
        return (
            <div>
                <SearchBarComponent
                    value={this.state.SearchString}
                    onChange={this.UpdateSearchString}
                    onAdvanceSearch={() => this.setState({AdvancedSearch: !this.state.AdvancedSearch})}
                    onSearch={() => {}}
                />
            </div>
        )
    };

    UpdateSearchString = (event) => {
        this.setState({SearchString: event.target.value});
    };

    BlurryQuestionSearch = () => {

    }

    createQuestionButton = () => {
        if (this.props.loggedIn)
            return <CustomLink to={Routes.createQuestion}>
                <Button color="accent" style={{fontSize: 18}}>Make new question</Button>
            </CustomLink>;
        return undefined;
    };

    mainContent = () => {
        if (this.props.featuredQuestions.length < 1 && this.props.myQuestions.length < 1) {
            return (
                <Grid container justify="center">
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <Typography type="headline">
                            There are currently no ratings available.
                        </Typography>
                    </Grid>
                    <Grid item style={{textAlign: "center"}}>
                        {
                            !this.props.loggedIn &&
                            <Typography type="body1" color="inherit" style={{color: "#aaa"}}>
                                Please log in to make a write about a teammate.
                            </Typography>
                        }
                    </Grid>
                </Grid>
            )
        } else {
            return <Grid container spacing={0}>
                <Grid item xs={12} style={{maxWidth: 1082}}>
                    <PreviewCardsComponent list={this.props.featuredQuestions} maxRow={2}
                                           labelType={"headline"}
                                           label="Featured" trim={false} maxBlock={4}>
                        <Grid container justify="flex-end" direction="column" style={{width: "100%"}}>
                            <Grid item style={{paddding: 5}}>
                                <Typography type="display1" style={{color: PRIMARY_COLOR}}>
                                    Question
                                </Typography>
                                <Typography type="body1" color="secondary" style={{textAlign: "left"}}>
                                    This module is build for people to ask questions, answer just about anything. With
                                    categories to choose from, and addition tags to latch onto the posts, post should
                                    able to be recognized and searched easily.
                                </Typography>
                            </Grid>
                            <Grid item>
                                {
                                    this.props.loggedIn &&
                                    this.createQuestionButton()
                                }
                            </Grid>
                        </Grid>
                    </PreviewCardsComponent>
                    <PreviewCardsComponent list={this.props.myQuestions} maxRow={2}
                                           labelType={"headline"}
                                           label="My Questions" maxBlock={4}/>
                </Grid>
            </Grid>
        }
    };


    render() {
        if (this.props.featuredQuestions.length == 0) {
            return <LoadingScreen/>
        }
        return (
            <div>
                {this.renderSearchBar()}
                {this.mainContent()}
            </div>
        )
    }
}

export const QuestionHomePage = connect(
    (state: AppStoreState) => ({
        loggedIn: state.auth.loggedIn,
        globalError: state.errors,
        ...state.questionHome
    }),
    (dispatch) => ({
        fetchQuestion: () => dispatch(QuestionActions.getQuestionPreviews())
    })
)(QuestionHomeComponent);