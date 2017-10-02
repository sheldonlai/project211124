import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import * as React from "react";
import {StyleReducerState} from "../../reducers/StyleReducer";
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {RecruitmentDto} from "../../../../server/dtos/recruitment/RecruitmentDto";
import {RecruitmentActions} from "../../actions/RecruitmentActions";


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

}

export class RecruitmentPageComponent extends React.Component<props, state>{
    constructor(props){
        super();
    }

    render(){

        return(
            <div>

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