import * as React from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {LocationActions} from "../../actions/LocationActions";
import {CountryDto} from "../../../../server/dtos/location/CountryDto";
import {RouteComponentProps} from "react-router";
import {Routes} from "../../constants/Routes";
import {UniversitiesMap} from "../../reducers/LocationDataReducer";
import {SplitVIewTemplate} from "../../components/Templates/SplitVIewTemplate";
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import {ProfileActions} from "../../actions/ProfileActions";

interface state {
    error: string;
    user: UserDto;
}

interface props extends StateToProps, DispatchToProps, RouteComponentProps<{username:string}>{

}

export class ProfileComponent extends React.Component<props, state> {

    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            user: undefined
        };
    }

    componentWillMount() {
        if (this.props.user && this.props.user.username === this.props.match.params.username){
            this.props.history.push(Routes.my_profile);
            return;
        }
        if (!this.props.profile) {
            this.props.fetchProfile(this.props.match.params.username);
        }
    }


    render() {
        return (
            <div style={{padding: "20px 0"}}>
                <SplitVIewTemplate>
                    <div>
                        {this.props.profile? JSON.stringify(this.props.profile, null, 2): undefined}
                    </div>
                    <div>
                        {/*TODO: add side view */}
                    </div>
                </SplitVIewTemplate>
            </div>
        );
    }
}

interface StateToProps {
    user: UserDto;
    profile: UserDto;
}

interface DispatchToProps {
    fetchProfile: (username: string) => void;
}

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    user: state.auth.user,
    profile: state.profile.profile

});
const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchProfile: (username: string) => dispatch(ProfileActions.fetchUserProfile(username))
});
export const ProfileView = connect<StateToProps, DispatchToProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(ProfileComponent);