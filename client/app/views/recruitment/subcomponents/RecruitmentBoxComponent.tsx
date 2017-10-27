import * as React from "react";
import {Component} from "react";
import {UserDto} from "../../../../../server/dtos/auth/UserDto";
import {AppStoreState} from "../../../stores/AppStore";
import Paper from "material-ui/Paper";
import {connect} from "react-redux";
import {CustomCard} from "../../../components/CardComponent/CardComponent";
import {DraftJsHelper} from "../../../../../server/utils/DraftJsHelper";
import Grid from "material-ui/Grid";
import Divider from "material-ui/Divider";
import Typography from "material-ui/Typography";
import {FrontEndRecruitmentModels} from "../../../models/RecruitmentModels";
import Recruitment = FrontEndRecruitmentModels.Recruitment;
import {EditorState} from "draft-js";
import {SplitVIewTemplate} from "../../../components/Templates/SplitVIewTemplate";
import Button from "material-ui/Button";
import {SemesterEnum} from "../../../../../server/enums/SemesterEnum";
import TextField from "material-ui/TextField";
import {YearSelector} from "../../../components/Forms/YearSelector";
import {getDropDownDataFromStringEnum} from "../../../utils/utils";
import {DropDownSelect} from "../../../components/Forms/DropDownSelect";
import {CustomEditor} from "../../../components/CustomEditor/CustomEditor";
import {QuestionDifficulty} from "../../../../../server/models/Question";
import {QuestionDifficultyMenu} from "../../question/subcomponents/QuestionDifficultyMenu";
import {RecruitmentDto, RecruitmentRequestDto} from "../../../../../server/dtos/recruitment/RecruitmentDto";
import {RecruitmentActions} from "../../../actions/RecruitmentActions";
import recruitmentModelToDto = FrontEndRecruitmentModels.recruitmentModelToDto;
import {DifficultyLevel, QuestionEducationLevel} from "../../../../../server/enums/QuestionEducationLevel";
import {TeammateLocationEditor} from "../../rating/subcomponents/TeammateLocationEditor";
import Dialog from "material-ui/Dialog";
import {DialogContent, DialogTitle, DialogActions} from "material-ui";
import RecruitmentRequest = FrontEndRecruitmentModels.RecruitmentRequest;
import requestModelToDto = FrontEndRecruitmentModels.requestModelToDto;
import RecruitmentRecordEntity = FrontEndRecruitmentModels.RecruitmentRecordEntity;
import RecruitmentRecords = FrontEndRecruitmentModels.RecruitmentRecords;
import {RecruitmentRecordEntityDto} from "../../../../../server/dtos/recruitment/RecruitmentRecordsDto";
import {RequestStateEnum} from "../../../../../server/enums/RecruitmentRequestEnum";
import {ReducerStateStatus} from "../../../constants/ReducerStateStatus";
import {LoadingScreen} from "../../../components/Animations/LoadingScreen";
import Snackbar from "material-ui/Snackbar";
import {AuthorLink} from "../../../components/RoutingComponents/AuthorLink";

interface RecruitmentBoxComponentProps {
    user: UserDto; // current user
    recruitmentInfo: Recruitment;
    recruitmentEditorState: Recruitment;
    edit: boolean;
    recruitmentRecords: RecruitmentRecords;
    pageStatus: ReducerStateStatus;
}

interface props extends RecruitmentBoxComponentProps, DispatchProps {
}

interface state{
    editedRecruitment: Recruitment;
    edit: boolean;
    joinRequestDialog: boolean;
    joinRequest: RecruitmentRequest;
}

let paperStyle = {height: "100%", padding: 5};

export class RecruitmentBoxComponent extends Component<props, state> {
    constructor(props){
        super(props);

        this.state = {
            editedRecruitment: {...this.props.recruitmentInfo},
            edit: false,
            joinRequestDialog: false,
            joinRequest: new RecruitmentRequest,
        };
    }

    editButton = () => {
        if (!this.props.user || this.state.edit)
            return undefined;
        return (
            <Grid container justify="flex-end">
                <Grid item>
                    <Button onClick={() => this.setState({edit: true})}>
                        Edit
                    </Button>
                </Grid>
            </Grid>
        )
    };

    applied = (recruitmentId: string): boolean => {
      let i:number;
      for(i=0; i<this.props.recruitmentRecords.records.length; i++){
          if(this.props.recruitmentRecords.records[i].recruitment._id == recruitmentId){
              return true;
          }
      }
      return false;
    };

    updateObj = (key: string, value: any) => {
        let obj = {...this.state.editedRecruitment};
        obj[key] = value;
        this.setState({editedRecruitment: obj});
    };

    editorView = () => {
        let recruitment: Recruitment = {...this.props.recruitmentInfo};
        return(
            <div>
                <SplitVIewTemplate>
                    <Paper style={paperStyle} elevation={0}>
                        <TextField defaultValue = {this.state.editedRecruitment.title}
                                   label="title"
                                   fullWidth
                                   onChange = {(event: any) => this.updateObj("title", event.target.value)}
                        />
                        <SplitVIewTemplate>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    {
                                        <YearSelector yearMin={(new Date()).getFullYear()} yearMax={(new Date()).getFullYear() + 20}
                                                      defaultYear={this.state.editedRecruitment.recruitmentYear}
                                                      onChange={(year) => this.updateObj("recruitmentYear", year)}
                                        />

                                    }
                                    {
                                        <DropDownSelect
                                            placeholder="Semester"
                                            data={getDropDownDataFromStringEnum(SemesterEnum)}
                                            onChange={(val) => this.updateObj("recruitmentSemester", val)}
                                            value={this.state.editedRecruitment.recruitmentSemester}
                                        />
                                    }
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <QuestionDifficultyMenu
                                        difficulty={this.state.editedRecruitment.courseDifficulty}
                                        onDifficultyChange={(diff: QuestionDifficulty) => this.updateObj("courseDifficulty", diff)}
                                        placeholder="Course Difficulty"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TeammateLocationEditor
                                        university={this.state.editedRecruitment.university}
                                        city={undefined}
                                        onChange={this.updateObj}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Typography type="caption">
                                        Recruiter: {this.state.editedRecruitment.createdBy.username}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </SplitVIewTemplate>
                        <Divider/>
                        <CustomEditor value={this.state.editedRecruitment.content}
                                      onChange={(content: EditorState) => {
                                          this.updateObj("content", content)
                                      }}
                                      style={{minHeight: 200}}
                        />
                        <Divider/>

                    </Paper>
                    <div>
                        <Typography type="title">
                            Members:
                        </Typography>
                    </div>
                </SplitVIewTemplate>
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Button style={{margin: "10px 0px"}} onClick={() => this.setState({edit: false})}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs>
                        <Button style={{margin: "10px 0px"}} onClick={() => {
                            let updatedRecruitment: RecruitmentDto = recruitmentModelToDto(this.state.editedRecruitment);
                            this.setState({edit: false});
                            this.props.updateRecruitment(updatedRecruitment);
                        }}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }

    levelToString = (level: QuestionEducationLevel) => {
        switch(level){
            case QuestionEducationLevel.NOT_SPECIFIED:
                return "Not specified";
            case QuestionEducationLevel.SECONDARY:
                return "Secondary";
            case QuestionEducationLevel.UNIVERSITY:
                return "University";
            case QuestionEducationLevel.OTHER:
                return "Other";
            default:
                return "Not specified";
        }
    };

    levelToNumber = (level: DifficultyLevel) => {
        switch(level){
            case DifficultyLevel.NOT_SPECIFIED:
                return "Not specified";
            default:
                return "Level " + level;
        }
    };

    joinRequestView = () => {
        return(
            <Dialog open={this.state.joinRequestDialog}>
                <DialogTitle>
                    <div>
                        <Typography type="subheading">{"Requesting to join \"" + this.props.recruitmentInfo.title + "\""}</Typography>
                        <Typography type="caption">{"Author: " + this.props.recruitmentInfo.createdBy.username}</Typography>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Divider/>
                    <br/>
                    <textarea rows={5} cols={50} placeholder={"(optional) Write a note to " + this.props.recruitmentInfo.createdBy.username}
                              value={this.state.joinRequest.message}
                              onChange={(event) => {
                                  let obj = {...this.state.joinRequest};
                                  obj.message = event.target.value;
                                  this.setState({joinRequest: obj});
                              }}
                    />
                    <br/>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={() => this.setState({joinRequestDialog: false})}>
                                Cancel
                            </Button>
                            <Button onClick={() => {
                                let obj = requestModelToDto(this.state.joinRequest);
                                obj.createdBy = this.props.user;
                                this.props.joinRecruitment(obj, this.props.recruitmentInfo._id);
                                let newRecord: RecruitmentRecordEntityDto = {
                                    recruitment: recruitmentModelToDto(this.props.recruitmentInfo),
                                    status: RequestStateEnum.PENDING,
                                };
                                this.props.addRecruitmentRecord(newRecord, this.props.recruitmentRecords._id);
                                this.setState({joinRequest: new RecruitmentRequest(), joinRequestDialog: false});
                            }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }

    normalView = () => {
        //if(this.props.pageStatus === ReducerStateStatus.LOADING) return (<LoadingScreen/>)
        let recruitment: Recruitment = {...this.props.recruitmentInfo};
        let masterView = this.props.user?recruitment.createdBy._id === this.props.user._id: false;
        let applied = this.props.user? this.applied(this.props.recruitmentInfo._id): true;
        return(
            <div>
                <SplitVIewTemplate>
                    <Paper style={paperStyle} elevation={0}>
                        {masterView && this.editButton()}
                        <Typography type="display1" noWrap>
                            {recruitment.title}
                        </Typography>
                        <SplitVIewTemplate>
                            <div>
                                {
                                    recruitment.recruitmentYear &&
                                    <Typography type="caption" gutterBottom>
                                        {recruitment.recruitmentYear}
                                    </Typography>
                                }
                                {
                                    recruitment.recruitmentSemester !== SemesterEnum.NOT_SPECIFIED &&
                                    <Typography type="caption" gutterBottom>
                                        {recruitment.recruitmentSemester}
                                    </Typography>
                                }
                            </div>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Typography type="caption">
                                        Recruiter: <AuthorLink fontSize={12} username={this.state.editedRecruitment.createdBy.username}/>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </SplitVIewTemplate>
                        <Divider/>
                        <Typography paragraph gutterBottom>
                            {DraftJsHelper.convertEditorStateToText(recruitment.content)}
                        </Typography>
                        <Divider/>
                        <br/>
                        {
                            !masterView && !applied &&
                            <Button raised style={{backgroundColor: "#0099ff", color: "white"}} onClick={() => this.setState({joinRequestDialog: true})}>
                                Join Now
                            </Button>
                        }
                        {
                            masterView &&
                            (recruitment.pendingRequests.map(request => {
                                console.log(request);
                               return(
                                   <div key={request._id}>
                                       <Paper elevation={2} style={paperStyle}>
                                           <SplitVIewTemplate>
                                               <div>
                                                   <Typography type="body1">Request to join recruitment from {<AuthorLink fontSize={12} username={request.createdBy.username}/>}</Typography>
                                               </div>
                                               <Grid container justify="flex-end">
                                                   {request.status === RequestStateEnum.JOINED &&
                                                       <Grid item>
                                                           <Typography type="body1" style={{color: '#0099ff'}}>JOINED</Typography>
                                                       </Grid>
                                                   }
                                                   {request.status === RequestStateEnum.DECLINED &&
                                                   <Grid item>
                                                       <Typography type="body1" color="accent">DECLINED</Typography>
                                                   </Grid>
                                                   }
                                                   {request.status === RequestStateEnum.PENDING &&
                                                   <Grid item>
                                                       <Button raised style={{backgroundColor: '#0099ff', color: "white"}} dense>
                                                           Accept
                                                       </Button>
                                                   </Grid>}
                                                   {request.status === RequestStateEnum.PENDING &&
                                                   <Grid item>
                                                       <Button raised dense color="accent">
                                                       Decline
                                                       </Button>
                                                   </Grid>}
                                               </Grid>
                                           </SplitVIewTemplate>
                                       </Paper>
                                       <br/>
                                   </div>
                               )
                            }))
                        }
                        {this.joinRequestView()}
                    </Paper>
                    <div>
                        <Grid container direction="column">
                            <Grid item>
                                <Divider/>
                                <br/>

                                <Typography type="caption">
                                    Level
                                </Typography>
                                <Typography type="body1" gutterBottom>
                                    {this.levelToString(recruitment.courseDifficulty.educationLevel)}
                                </Typography>

                                <br/>

                                <Typography type="caption">
                                    Difficulty
                                </Typography>
                                <Typography type="body1" gutterBottom>
                                    {this.levelToNumber(recruitment.courseDifficulty.difficultyLevel)}
                                </Typography>

                                <br/>

                                <Typography type="caption">
                                    University
                                </Typography>
                                <Typography type="body1" gutterBottom>
                                    {recruitment.university? recruitment.university.name: "Not specified"}
                                </Typography>
                                <Divider/>
                            </Grid>
                            <Grid item>
                                <Typography type="title">
                                    Members:
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </SplitVIewTemplate>

            </div>
        )
    }

    render(){
        return this.state.edit? this.editorView() : this.normalView();
    }

}

const mapStateToProps = (state: AppStoreState) => ({
    user: state.auth.user,
    recruitmentInfo: state.recruitmentPage.recruitmentPage,
    recruitmentEditorState: undefined,
    edit: undefined,
    recruitmentRecords: state.recruitmentRecords.records,
    pageStatus: state.recruitmentRecords.status,
});

interface DispatchProps {
    updateRecruitment: (updatedRecruitment: RecruitmentDto) => void;
    joinRecruitment: (request: RecruitmentRequestDto, recruitmentId: string) => void;
    addRecruitmentRecord: (newRecord: RecruitmentRecordEntityDto, recordsId: string) => void;
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
    updateRecruitment: (updatedRecruitment: RecruitmentDto) => dispatch(RecruitmentActions.editRecruitment(updatedRecruitment)),
    joinRecruitment: (request: RecruitmentRequestDto, recruitmentId: string) => dispatch(RecruitmentActions.joinRecruitment(request, recruitmentId)),
    addRecruitmentRecord: (newRecord: RecruitmentRecordEntityDto, recordsId: string) => dispatch(RecruitmentActions.addRecruitmentRecord(newRecord, recordsId)),
});

export const RecruitmentBoxView = connect<RecruitmentBoxComponentProps, DispatchProps, any>(
    mapStateToProps, mapDispatchToProps)(RecruitmentBoxComponent);