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
import {CityDto} from "../../../../../server/dtos/location/CityDto";
import {DropDownForum} from "../../../components/Forms/DropDownForum";
import {ForumDto} from "../../../../../server/dtos/sharedDtos/ForumDto";
import {TeammateLocationEditor} from "./TeammateLocationEditor";

interface props {
}

interface state {
}

let FieldNames: string[] = ['First Name', 'Middle Name', 'Laste Name'];

export class AdvancedSearchEditor extends React.Component<props, state> {
    constructor(props) {
        super(props);
        this.state = {
            SearchTeammateObj: {
                _id: undefined,
                firstName: '',
                lastName: '',
                city: undefined,
                university: undefined,
                year: undefined,
            },
        };
    }

    render() {
        let ForumVector:ForumDto[] = FieldNames.map((Fieldname) => ({FieldName: Fieldname, value: undefined}))
        return (
            <div>
                <DropDownForum
                    data = {ForumVector}
                />
                <TeammateLocationEditor university={undefined} year={undefined} city={undefined}/>
            </div>
        )
    }
}