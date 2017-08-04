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
import {convertEnumStringToViewString, listNumericalEnumValues} from "../../../utils/utils";
import {UniversitiesMap} from "../../../reducers/LocationDataReducer";
import Typography from "material-ui/Typography";
import {DisplayField} from "../../../components/Forms/DisplayField";

interface props {
    onAcademicChange: (academicInfo: AcademicInfo) => void;
    academicInfo: AcademicInfo;
    city: City;
    editable?: boolean;

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

    componentWillReceiveProps(nextProps: props){
        if (!isNullOrUndefined(nextProps.academicInfo)){
            this.setState({country: nextProps.academicInfo.university.country});
        }
    }

    updateAcademicInfo = (key: string, value : any) => {
        let academicInfo = {...this.props.academicInfo};
        academicInfo[key] = value;
        this.props.onAcademicChange(academicInfo);
    };

    updateCity = () => {

    };

    updateCountry = (country) => {
        if (isNullOrUndefined(country)){
            this.props.onAcademicChange(undefined);
            this.setState({country});
            return;
        }
        this.setState({country});
        if (!this.props.universitiesMap.hasOwnProperty(country.name)){
            this.props.fetchUniversities(country._id);
        }
    };

    view = () => {
        return (
            <div>
                <Typography></Typography>
            </div>
        )
    };

    editor = () => {
        const countries = this.props.countries.map(country => ({text: country.name, value: country}));
        const years = listNumericalEnumValues(UniversityYearEnum)
            .map((e): DropDownSelectData => {
                return {
                    text: convertEnumStringToViewString(UniversityYearEnum[e]),
                    value: e
                };
            });
        const academicInfo = this.props.academicInfo;
        let universities = [];
        if (this.state.country && this.props.universitiesMap.hasOwnProperty(this.state.country.name)){
            universities = this.props.universitiesMap[this.state.country.name]
                .map(uni => ({text: uni.name, value: uni}));
        }
        return (
            <div>
                <DropDownSelect
                    data={countries}
                    value={this.state.country}
                    placeholder="Country"
                    onChange={this.updateCountry}
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
    };

    render() {
        if (this.props.editable === false) {
            const academicInfo = this.props.academicInfo;
            return <div>
                <DisplayField label={"university"} value={academicInfo.university.name}/>
                <DisplayField label={"Year"}
                              value={convertEnumStringToViewString(UniversityYearEnum[academicInfo.year])}/>
            </div>
        }
        else {
            return this.editor();
        }
    }
}

interface stateToProps {
    countries: CountryDto[];
    universitiesMap: UniversitiesMap;
}

const mapStateToProps = (state: AppStoreState): stateToProps => ({
    countries: state.locationData.countries,
    universitiesMap : state.locationData.universitiesMap
});

interface DispatchToProps {
    fetchCountries : () => void;
    fetchUniversities : (countryId: string) => void;
}

const mapDispatchToProps = (dispatch): DispatchToProps => ({
    fetchCountries : () => dispatch(LocationActions.getCounties()),
    fetchUniversities : (countryId) =>dispatch(LocationActions.getUniversities(countryId))
});
export const TeammateLocationEditor = connect<stateToProps, DispatchToProps, props>(
    mapStateToProps,
    mapDispatchToProps
)(TeammateLocationEditorComponent);
