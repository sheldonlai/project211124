import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import * as React from "react";
import {StyleReducerState} from "../../reducers/StyleReducer";
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {RecruitmentDto} from "../../../../server/dtos/recruitment/RecruitmentDto";
import {RecruitmentActions} from "../../actions/RecruitmentActions";
import {RecruitmentBoxComponent, RecruitmentBoxView} from "./subcomponents/RecruitmentBoxComponent";
import {LoadingScreen} from "../../components/Animations/LoadingScreen";
import {CommentBoxView} from "./subcomponents/CommentBoxComponent";


interface RecruitmentPageProps extends RouteComponentProps<{id: string}>{}

interface StateToProps{
    pageStatus: ReducerStateStatus;
    recruitmentInfo: RecruitmentDto;
    user: UserDto;
    lastUpdated: number;
}

interface DispatchToProps{
    fetchRecruitment: (id: string) => void;
}

interface props extends StateToProps, DispatchToProps, RouteComponentProps<{ id: string }>{}

interface state{
    recruitment: RecruitmentDto;
    edit: boolean;
}

export class RecruitmentPageComponent extends React.Component<props, state>{
    constructor(props){
        super();

        this.state = {
            recruitment: undefined,
            edit: false,
        }
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        if (!id)
            console.error("No id is specified");
        if(!this.props.recruitmentInfo || this.props.recruitmentInfo._id != id || Date.now() - this.props.lastUpdated > 1000)
            this.props.fetchRecruitment(id);
        else if (this.props.recruitmentInfo._id != id)
            this.setState({recruitment: {...this.props.recruitmentInfo}});
    }

    componentWillReceiveProps(nextProps: props) {
        if (this.props.lastUpdated !== nextProps.lastUpdated) {
            this.setState({recruitment: {...nextProps.recruitmentInfo}, edit: false});
        }
    }

    render(){
        if(this.props.pageStatus == ReducerStateStatus.LOADING){
            return (<LoadingScreen/>)
        }
        return(
            <div style={{padding: 10}}>
                <RecruitmentBoxView/>
                <CommentBoxView/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchRecruitment: (id) => dispatch(RecruitmentActions.fetchRecruitmentPage(id))
});

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    pageStatus: state.recruitmentPage.status,
    recruitmentInfo: state.recruitmentPage.recruitmentPage,
    user: state.auth.user,
    lastUpdated: state.recruitmentPage.lastUpdated,
});

export const RecruitmentPageView = connect <StateToProps, DispatchToProps, RouteComponentProps<{id: string}>>(
    mapStateToProps,
    mapDispatchToProps,
)(RecruitmentPageComponent);