import * as React from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import {ErrorView} from "../../components/ErrorView";
import Button from "material-ui/Button";
import {OptionalTextFieldEditor} from "../../components/Forms/OptionalTextFieldEditor";
import Typography from "material-ui/Typography";
import {LocationActions} from "../../actions/LocationActions";
import {DropDownSelect} from "../../components/Forms/DropDownSelect";
import {CountryDto} from "../../../../server/dtos/location/CountryDto";
import {RouterProps} from "react-router";
import {Routes} from "../../constants/Routes";
import {UserActions} from "../../actions/UserActions";
import {EmailNameInputStyles} from "../../constants/StyleClasses";
import {isNullOrUndefined} from "util";
import {UniversitiesMap} from "../../reducers/LocationDataReducer";
import {SplitVIewTemplate} from "../../components/Templates/SplitVIewTemplate";
import {ReducerStateStatus} from "../../constants/ReducerStateStatus";

interface state {
    error: string;
    user: UserDto;
}

export class ProfileComponent extends React.Component<StateToProps & DispatchToProps & RouterProps, state> {

    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            user: undefined
        };
    }

    componentWillMount() {
        if (!this.props.loggedIn) {
            this.props.history.push(Routes.home);
        }
        if (this.props.countries.length == 0) {
            this.props.fetchCountries();
        }
        if (this.props.user.country) {
            this.props.getUniversities(this.props.user.country._id);
        }
        const user = {...this.props.user};
        this.setState({user});
    }

    submit = () => {
        if (JSON.stringify(this.state.user) !== JSON.stringify(this.props.user))
            this.props.updateProfile(this.state.user);
    };

    updateUserField = (key: string, value: any) => {
        let user = {...this.state.user};
        user[key] = value;
        this.setState({user});
    };

    updateCountry = (value) => {
        if (JSON.stringify(this.state.user.country) != JSON.stringify(value)) {
            let user = {...this.state.user};
            user.country = value;
            user.university = undefined;
            this.setState({user});
            if (!isNullOrUndefined(value)) {
                // TODO: should optimize keep a uni map with all loaded data
                this.props.getUniversities(value._id);
            }

        }
    };

    render() {
        const countries = this.props.countries.map(country => ({text: country.name, value: country}));
        let universities = [];
        if (
            this.state.user && this.state.user.country &&
            this.props.universitiesMap.hasOwnProperty(this.state.user.country.name)
        ) {
            universities = this.props.universitiesMap[this.state.user.country.name]
                .map(uni => ({text: uni.name, value: uni}));
        }

        return (
            <div style={{padding: "20px 0"}}>
                <SplitVIewTemplate>
                    <div>

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
    loggedIn: boolean;
    user: UserDto;
    countries: CountryDto[];
    universitiesMap: UniversitiesMap;
    locationDataStatus: ReducerStateStatus
}

interface DispatchToProps {
    fetchCountries: () => void
    getUniversities: (countryId: string) => void
    updateProfile: (user: UserDto) => void;
}

const mapStateToProps = (state: AppStoreState): StateToProps => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    countries: state.locationData.countries,
    universitiesMap: state.locationData.universitiesMap,
    locationDataStatus: state.locationData.status

});
const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchCountries: () => dispatch(LocationActions.getCounties()),
    getUniversities: (countryId) => dispatch(LocationActions.getUniversities(countryId)),
    updateProfile: (user: UserDto) => dispatch(UserActions.updateUserProfile(user))
});
export const ProfileView = connect<StateToProps, DispatchToProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(ProfileComponent);