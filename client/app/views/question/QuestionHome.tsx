import * as React from "react";
import {Component} from "react";
import {Routes} from "../../constants/Routes";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {QuestionActions} from "../../actions/QuestionActions";
import {QuestionHomeReducerState} from "../../reducers/QuestionHomeReducer";
import {ErrorReducerState} from "../../reducers/ErrorReducer";
import {CustomLink} from "../../components/RoutingComponents/CustomLink";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import {LoadingScreen} from "../../components/Animations/LoadingScreen";
import Typography from "material-ui/Typography";
import {PreviewCardsComponent} from "../../components/CardComponent/PreviewCardsComponent";
import {SearchQuestionQuery} from "../../../../server/models/Question";
import {PRIMARY_COLOR} from "../router";
import {SearchBarComponent} from "../../components/SearchBar/SearchBarComponent";
import {QuestionAdvancedSearchEditor} from "./subcomponents/AdvancedSearchEditor";
import {QuestionDto} from "../../../../server/dtos/q&a/QuestionDto";

export interface QuestionViewProps extends QuestionHomeReducerState {
    loggedIn: boolean;
    globalError: ErrorReducerState;
    fetchQuestion: () => void;
    blurrySearch: (inputStrings: string[]) => void;
    preciseSearch: (searchQuestionObject: SearchQuestionQuery) => void;
}

interface state {
    searchQuestionObj: SearchQuestionQuery,
    AdvancedSearch: boolean;
    SearchString: string;
}

class QuestionHomeComponent extends Component<QuestionViewProps, state> {
    constructor(props) {
        super(props);
        this.state = {
            searchQuestionObj: {
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

    updateSearchObj = (searchQuestionObj: SearchQuestionQuery) => {
        let obj = {...searchQuestionObj};
        this.setState({searchQuestionObj: obj});
    };

    renderSearchBar = () => {
        return (
            <div>
                <SearchBarComponent
                    value={this.state.SearchString}
                    onChange={this.UpdateSearchString}
                    onAdvanceSearch={() => this.setState({AdvancedSearch: !this.state.AdvancedSearch})}
                    onSearch={() => {
                        if(this.state.AdvancedSearch){
                            this.props.preciseSearch(this.state.searchQuestionObj);
                        }
                        else{
                            let split = this.state.SearchString.split(' ');
                            this.props.blurrySearch(split);
                        }
                    }}
                />
                <Grid container spacing={24}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item sm={8}>
                        {this.state.AdvancedSearch &&
                        <QuestionAdvancedSearchEditor SearchQuestionObj={this.state.searchQuestionObj}
                                                      UpdateQuestionObj={this.updateSearchObj}/>}
                    </Grid>
                </Grid>
            </div>
        )
    };

    UpdateSearchString = (event) => {
        this.setState({SearchString: event.target.value});
    };

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
                        {this.renderSearchBar()}
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
            return <Grid container spacing={0} justify="center">
                <Grid item xs={12} style={{maxWidth: 1082}}>
                    <PreviewCardsComponent list={this.props.featuredQuestions} maxRow={2}
                                           labelType={"headline"}
                                           label="Featured" trim={false} maxBlock={4}>
                        {this.renderSearchBar()}
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
        fetchQuestion: () => dispatch(QuestionActions.getQuestionPreviews()),
        blurrySearch: (inputStrings: string[]) => dispatch(QuestionActions.blurrySearch(inputStrings)),
        preciseSearch: (searchQuestionObject: QuestionDto) => dispatch(QuestionActions.preciseSearch(searchQuestionObject)),
    })
)(QuestionHomeComponent);