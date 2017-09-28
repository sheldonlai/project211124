import * as React from "react";
import {Component} from "react";
import {RouterProps} from "react-router";
import {Recruitment} from "../../../../server/models/Recruitment";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {RecruitmentDto, RecruitStatus} from "../../../../server/dtos/recruitment/RecruitmentDto";
import {DifficultyLevel, QuestionEducationLevel} from "../../../../server/enums/QuestionEducationLevel";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";

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
            content: undefined,
            recruitStatus: RecruitStatus.NOT_SPECIFIED,
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
