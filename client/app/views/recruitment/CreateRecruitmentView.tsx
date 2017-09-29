import * as React from "react";
import {Component} from "react";
import {RouterProps} from "react-router";
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

export interface CreateRecruitmentState{
    error: string;
    recruitmentObj: RecruitmentDto;
};

interface props extends stateToProps, dispatchToProps, RouterProps{}

class CreateRecruitment extends Component<props, CreateRecruitmentState> {
    constructor(props){
        super(props);
        let Obj = {
            _id: '',
            comments: [],
            title: '',
            content: EditorState.createEmpty(),
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
                            <CustomEditor value={this.state.recruitmentObj.content}
                                          onChange={(content: EditorState) => {
                                              this.updateObj("content", content)
                                          }}
                                          style={{minHeight: 200}}
                            />
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
    //createRecruitment: (recruitment: Recruitment) => void;
}

export const CreateRecruitmentView = (connect(
    (state: AppStoreState) => ({loggedIn: state.auth.loggedIn}),
))(CreateRecruitment);
