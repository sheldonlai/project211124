import * as React from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import {RouteComponentProps} from "react-router";
import {Routes} from "../../constants/Routes";
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";
import {ProfileActions} from "../../actions/ProfileActions";
import Typography from "material-ui/Typography/Typography";
import {LoadingScreen} from "../../components/Animations/LoadingScreen";
import {PreviewCardsComponent} from "../../components/CardComponent/PreviewCardsComponent";
import {FrontEndQuestionModels} from "../../models/ProfileModels";
import ProfilePage = FrontEndQuestionModels.ProfilePage;
import {convertDateTimeToString, convertDateToString} from "../../utils/DateUtils";
import {PropTypes} from "material-ui";
import {TypographyType} from "../../models/MaterialUITypes";

interface state {
    error: string;
    user: UserDto;
}

interface props extends StateToProps, DispatchToProps, RouteComponentProps<{ username: string }> {

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
        if (this.props.user && this.props.user.username === this.props.match.params.username) {
            this.props.history.replace(Routes.my_profile);
            return;
        }
        this.props.fetchProfile(this.props.match.params.username);
    }

    fieldDisplay = (type: TypographyType, key: string) => {
        if (!this.props.profile[key])
            return undefined;
        return (
            <div>
                {/*<Typography type="caption">*/}
                {/*{key}*/}
                {/*</Typography>*/}

                <Typography type={type}>
                    {this.props.profile[key]}
                </Typography>
            </div>
        )
    }


    render() {
        console.log(this.props.profile);
        if (this.props.profileStatus === ReducerStateStatus.LOADING || !this.props.profile)
            return <LoadingScreen/>;
        return (
            <div style={{padding: "20px 0"}}>
                <div>
                    <PreviewCardsComponent
                        labelType={"headline"}
                        list={this.props.profile.stories}
                        label={"Stories posted:"}
                        maxBlock={4}>
                        {this.fieldDisplay("display2", "username")}
                        {this.fieldDisplay("body1", "company")}
                        <Typography type={"body1"}>
                            Joined on : {convertDateToString(this.props.profile.createdAt)}
                        </Typography>
                        {this.fieldDisplay("body1", "points")}
                    </PreviewCardsComponent>
                    <PreviewCardsComponent list={this.props.profile.questions}
                                           maxBlock={4}
                                           labelType={"headline"}
                                           label={"Questions posted:"}/>

                </div>
            </div>
        );
    }
}

interface StateToProps {
    user: UserDto;
    profileStatus: ReducerStateStatus;
    profile: ProfilePage;
}

interface DispatchToProps {
    fetchProfile: (username: string) => void;

}

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    user: state.auth.user,
    profile: state.profile.profile,
    profileStatus: state.profile.status
});
const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchProfile: (username: string) => dispatch(ProfileActions.fetchUserProfile(username))
});
export const ProfileView = connect<StateToProps, DispatchToProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(ProfileComponent);