import * as React from "react";
import {AcademicInfo} from "../../../../../server/models/TeammateRecord";
import {DropDownSelect, DropDownSelectData} from "../../../components/Forms/DropDownSelect";
import {connect} from "react-redux";
import {AppStoreState} from "../../../stores/AppStore";
import {UniversityDto} from "../../../../../server/dtos/location/UniversityDto";
import {City} from "../../../../../server/models/LocationModels/Cities";
import {CountryDto} from "../../../../../server/dtos/location/CountryDto";
import {UniversityYearEnum} from "../../../../../server/enums/UniversityYearEnum";
import {LocationActions} from "../../../actions/LocationActions";
import {isNullOrUndefined} from "util";


interface props {
    onAcademicChange: (academicInfo: AcademicInfo) => void;
    academicInfo: AcademicInfo;
    city: City
}

interface state {
    country : CountryDto
}
interface combinedProps extends props, stateToProps, DispatchToProps{
    dispatch: any;
}

class TeammateLocationEditorComponent extends React.Component<combinedProps, state> {
    constructor(props) {
        super(props);
        this.state = {
            country: undefined
        };
    }

    componentWillMount() {

        if (this.props.countries === undefined || this.props.countries.length === 0){
            this.props.fetchCountries();
        }
        if (!isNullOrUndefined(this.props.academicInfo)&& !isNullOrUndefined(this.props.academicInfo.university)) {
            const country = this.props.academicInfo.university
        }
    }



    updateAcademicInfo = (key: string, value : any) => {
        let academicInfo = {...this.props.academicInfo};
        academicInfo[key] = value;
        this.props.onAcademicChange(academicInfo);
    };

    updateCity = () => {

    };

    render() {
        const countries = this.props.countries.map(country => ({text: country.name, value: country}));
        const universities = this.props.universities.map(uni => ({text: uni.name, value: uni}));
        const years = Object.keys(UniversityYearEnum).filter((e) => typeof e ==="number")
            .map((e): DropDownSelectData => {
                return {
                    text: UniversityYearEnum[e],
                    value: e
                };
            });
        const academicInfo = this.props.academicInfo;
        return (
            <div>
                <DropDownSelect
                    data={countries}
                    value={this.state.country}
                    placeholder="Country"
                    onChange={(country) => this.setState({country})}
                />
                {
                    this.state.country &&
                    <div>
                        <DropDownSelect
                            data={universities}
                            value={academicInfo? academicInfo.university: undefined}
                            placeholder="university"
                            onChange={(uni)=> this.updateAcademicInfo("university", uni)}
                        />
                        <DropDownSelect
                            data={years}
                            value={academicInfo? academicInfo.year: undefined}
                            placeholder="Year"
                            onChange={(uni) => this.updateAcademicInfo("year", uni)}
                        />
                    </div>
                }
            </div>
        )
    }
}
interface stateToProps {
    countries: CountryDto[];
    universities: UniversityDto[];
}
const mapStateToProps = (state: AppStoreState): stateToProps => ({
    countries: state.locationData.countries,
    universities : state.locationData.universities
});
interface DispatchToProps {
    fetchCountries : () => void;
    getUniversities : (countryId: string) => void;
}

const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchCountries : () => dispatch(LocationActions.getCounties()),
    getUniversities : (countryId) =>dispatch(LocationActions.getUniversities(countryId))
});
export const TeammateLocationEditor = connect<stateToProps, DispatchToProps, props>(
    mapStateToProps,
    mapDispatchToProps
)(TeammateLocationEditorComponent);
