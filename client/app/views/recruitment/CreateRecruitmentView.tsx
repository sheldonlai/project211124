import * as React from "react";
import {Component} from "react";
import {RouteComponentProps, RouterProps} from "react-router";
import {Recruitment} from "../../../../server/models/Recruitment";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {RecruitmentDto} from "../../../../server/dtos/recruitment/RecruitmentDto";
import {DifficultyLevel, QuestionEducationLevel} from "../../../../server/enums/QuestionEducationLevel";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import {DropDownSelect} from "../../components/Forms/DropDownSelect";
import {getDropDownDataFromStringEnum} from "../../utils/utils";
import {RecruitStatus} from "../../../../server/enums/RecruitmentStatusEnum";
import {TeammateLocationEditor} from "../rating/subcomponents/TeammateLocationEditor";
import {QuestionDifficultyMenu} from "../question/subcomponents/QuestionDifficultyMenu";
import {QuestionDifficulty} from "../../../../server/models/Question";
import {CustomEditor} from "../../components/CustomEditor/CustomEditor";
import {EditorState} from "draft-js";
import {RecruitmentActions} from "../../actions/RecruitmentActions";
import {Routes} from "../../constants/Routes";
import Button from "material-ui/Button";
import {CustomLink} from "../../components/RoutingComponents/CustomLink";
import {DraftJsHelper} from "../../../../server/utils/DraftJsHelper";

export interface CreateRecruitmentState{
    error: string;
    recruitmentObj: RecruitmentDto;
}

interface props extends stateToProps, dispatchToProps, RouteComponentProps<any>{}

class CreateRecruitment extends Component<props, CreateRecruitmentState> {
    constructor(props){
        super(props);
        let Obj = {
            _id: '',
            comments: [],
            title: '',
            content: DraftJsHelper.convertEditorStateToRaw(EditorState.createEmpty()),
            recruitStatus: RecruitStatus.OPEN,
            university: undefined,
            courseDifficulty: {
                educationLevel: QuestionEducationLevel.NOT_SPECIFIED,
                difficultyLevel: DifficultyLevel.NOT_SPECIFIED
            },
            createdBy: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            groupMates: [],
            views: 0,
        };
        this.state = {
            error: '',
            recruitmentObj: Obj,
        }
    }

    updateObj = (key: string, value: any) => {
        let obj = {...this.state.recruitmentObj};
        obj[key] = value;
        this.setState({recruitmentObj: obj});
    };

    onSubmit = () => {
      this.props.createRecruitment(this.state.recruitmentObj);
    };

    render(){
        const inputContainer = {paddingLeft: 20, paddingRight: 20};
        const input= {width: "100%"};
        return(
            <div>
                <Grid container justify="center" style={{paddingTop: 20}}>
                    <Grid item xs={12}>
                        <Typography type="body1" style={{width: "100%", textAlign: 'center', color: "red", fontSize: 18}}>
                            {this.state.error}
                        </Typography>
                    </Grid>
                    <Grid container style={inputContainer}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                error={this.state.error.indexOf("Title") !== -1}
                                style={input}
                                label="Title"
                                required
                                type="text"
                                value={this.state.recruitmentObj.title}
                                onChange={(event: any) => {this.updateObj('title', event.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DropDownSelect
                                placeholder={"Recruit Status"}
                                data={getDropDownDataFromStringEnum(RecruitStatus)}
                                onChange={(status) => this.updateObj("recruitStatus", status)}
                                value={this.state.recruitmentObj.recruitStatus}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TeammateLocationEditor
                                university={this.state.recruitmentObj.university}
                                city={undefined}
                                onChange={this.updateObj}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <QuestionDifficultyMenu
                                difficulty={this.state.recruitmentObj.courseDifficulty}
                                onDifficultyChange={(diff: QuestionDifficulty) => this.updateObj("courseDifficulty", diff)}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography type="caption" gutterBottom>Content :</Typography>
                            <CustomEditor value={DraftJsHelper.convertRawToEditorState(this.state.recruitmentObj.content)}
                                          onChange={(content: EditorState) => {
                                              this.updateObj("content", DraftJsHelper.convertEditorStateToRaw(content))
                                          }}
                                          style={{minHeight: 200}}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs>
                            <CustomLink to={Routes.recruitment}>
                                <Button style={{margin: "10px 0px"}}>
                                    Cancel
                                </Button>
                            </CustomLink>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs>
                            <Button style={{margin: "10px 0px"}} onClick={this.onSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

interface stateToProps {
    loggedIn: boolean;
}

interface dispatchToProps {
    createRecruitment: (recruitment: RecruitmentDto) => void;
}

export const CreateRecruitmentView = (connect<stateToProps, dispatchToProps, RouteComponentProps<any>>(
    (state: AppStoreState) => ({loggedIn: state.auth.loggedIn}),
    (dispatch) => ({
        createRecruitment: (recruitment: RecruitmentDto) => dispatch(RecruitmentActions.createRecruitment(recruitment))
    })
))(CreateRecruitment);
