
import * as React from "react";
import {connect} from "react-redux";
import {AppStoreState} from "../../stores/AppStore";
import {UserDto} from "../../../../server/dtos/auth/UserDto";
import AnimatedWrapper from "../../components/AnimatedWrapper";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import {ErrorView} from "../../components/ErrorView";
import Button from "material-ui/Button";
import {OptionalTextFieldEditor} from "../../components/OptionalTextFieldEditor";
import Typography from "material-ui/Typography";
import {LocationActions} from "../../actions/LocationActions";
import {DropDownSelect} from "../../components/DropDownSelect";
import {CountryDto} from "../../../../server/dtos/location/CountryDto";
import {UniversityDto} from "../../../../server/dtos/location/UniversityDto";
import {RouterProps} from "react-router";
import {Routes} from "../../constants/Routes";

interface state {
    error: string;
    user: UserDto;
}
export class UserProfileComponent extends React.Component<StateToProps & DispatchToProps& RouterProps, state>{

    constructor(props){
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
        if (this.props.countries.length == 0){
            this.props.fetchCountries();
        }
        const user = {...this.props.user};
        this.setState({user});
    }

    submit = () => {

    };

    updateUserField = (key: string, value: any) => {
        let user = {...this.state.user};
        user[key] = value;
        this.setState({user});
    };

    render() {
        const counties = this.props.countries.map(country => ({text: country.name, value: country}));
        return (
            <div style={{padding: 10}}>
                <Grid container justify="center" direction="row-reverse">
                    <Grid item xs={12} md={3} lg={2}>

                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                        <Paper style={{width: "100%", padding: "50px 20px"}}>
                            <Grid container justify="center">
                                <Grid item>
                                    <Typography type="display1" gutterBottom>Profile</Typography>
                                    <ErrorView errorTxt={this.state.error}/>
                                    <TextField
                                        value={this.state.user.email}
                                        label="Email"
                                        fullWidth
                                    /><br/>
                                    <TextField
                                        value={this.state.user.username}
                                        label="Username"
                                        fullWidth
                                    /><br />
                                    <OptionalTextFieldEditor
                                        value={this.state.user.company}
                                        label="Company"
                                        onChange={(company)=> this.updateUserField("company", company)}
                                    /><br />
                                    <DropDownSelect
                                        data={counties}
                                        value={this.state.user.country}
                                        placeholder="Country"
                                        onChange={(element)=>this.updateUserField("country", element)}
                                    />
                                    <Button raised onClick={this.submit}>Submit</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
interface StateToProps {
    loggedIn: boolean;
    user: UserDto;
    countries: CountryDto[];
    universities: UniversityDto[];
    selectedCountry: CountryDto;
}
interface DispatchToProps {
    fetchCountries : () => void
    getUniversities : (countryId) => void
}
const mapStateToProps = (state: AppStoreState): StateToProps => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    countries: state.locationData.countries,
    universities: state.locationData.universities,
    selectedCountry: state.locationData.selectedCountry

});
const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchCountries : () => dispatch(LocationActions.getCounties()),
    getUniversities : (countryId) =>dispatch(LocationActions.getUniversities(countryId))
});
export const UserProfileView = AnimatedWrapper(connect<StateToProps, DispatchToProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileComponent));