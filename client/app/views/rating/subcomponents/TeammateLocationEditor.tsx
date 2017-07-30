import * as React from "react";
import {AcademicInfo} from "../../../../../server/models/TeammateRecord";
import {DropDownSelect} from "../../../components/Forms/DropDownSelect";
import {connect} from "react-redux";
import {AppStoreState} from "../../../stores/AppStore";
import {UniversityDto} from "../../../../../server/dtos/location/UniversityDto";
import {City} from "../../../../../server/models/LocationModels/Cities";
import {CountryDto} from "../../../../../server/dtos/location/CountryDto";


interface props {
    onChange: (academicInfo: AcademicInfo) => void;
    academicInfo: AcademicInfo;
    city: City
}

interface state {

}
interface combinedProps extends props, stateToProps{
    dispatch: any;
}

class TeammateLocationEditorComponent extends React.Component<combinedProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const countries = this.props.countries.map(country => ({text: country.name, value: country}));
        const universities = this.props.universities.map(uni => ({text: uni.name, value: uni}));
        return (
            <div>
                {/*<DropDownSelect*/}
                    {/*data={countries}*/}
                    {/*value={this.state.user.country}*/}
                    {/*placeholder="Country"*/}
                    {/*onChange={this.updateCountry}*/}
                {/*/>*/}
                {/*{*/}
                    {/*this.state.user.country &&*/}
                    {/*<DropDownSelect*/}
                        {/*data={universities}*/}
                        {/*value={this.state.user.university}*/}
                        {/*placeholder="university"*/}
                        {/*onChange={(uni)=> this.updateUserField("university", uni)}*/}
                    {/*/>*/}
                {/*}*/}
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
    country: state.locationData.selectedCountry,
    universities : state.locationData.universities
});
export const TeammateLocationEditor = connect<stateToProps, {}, props>(
    mapStateToProps
)(TeammateLocationEditorComponent);
