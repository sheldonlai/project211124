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
import {TeammateRecordDto} from "../../../../../server/dtos/rating/TeammateRecordDto";

interface props {
    SearchTeammateObj: TeammateRecordDto,
    UpdateSearchTeammateObj: (SearchTeammateObj: TeammateRecordDto) => void,
}

interface state {
}

export class AdvancedSearchEditor extends React.Component<props, state> {
    ForumVector:ForumDto[];
    constructor(props) {
        super(props);
        this.ForumVector = FieldNames.map((Field) => ({FieldName: Field.FieldName, ActualFieldName: Field.ActualName, UpdateHandler: this.UpdateHandler, value: undefined}));
    }

    UpdateHandler = (key: string, element: any) => {
        let tmpObj = {...this.props.SearchTeammateObj};
        tmpObj[key] = element;
        this.props.UpdateSearchTeammateObj(tmpObj);
    };

    render() {
        return (
            <div>
                <DropDownForum
                    data = {this.ForumVector}
                />
                <TeammateLocationEditor university={this.props.SearchTeammateObj.university} year={this.props.SearchTeammateObj.year} city={this.props.SearchTeammateObj.city} onChange={this.UpdateHandler}/>
            </div>
        )
    }
}