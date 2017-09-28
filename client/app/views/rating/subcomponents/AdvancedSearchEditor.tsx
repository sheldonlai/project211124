import * as React from "react";
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

let FieldNames = [{FieldName: 'First Name', ActualName:'firstName'}, {FieldName: 'Middle Name', ActualName: 'middleName'}, {FieldName: 'Last Name', ActualName: 'lastName'}, {FieldName: 'Description', ActualName: 'description'}];

export class AdvancedSearchEditor extends React.Component<props, state> {
    ForumVector:ForumDto[];
    constructor(props) {
        super(props);
        // TODO : fix This
        this.ForumVector = FieldNames.map((Field) => (
            {
                FieldName: Field.FieldName, ActualFieldName:
            Field.ActualName, UpdateHandler: this.UpdateHandler, value: undefined
            })) as any;
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
                <TeammateLocationEditor university={this.props.SearchTeammateObj.university}
                                        year={this.props.SearchTeammateObj.year}
                                        city={this.props.SearchTeammateObj.city}
                                        onChange={this.UpdateHandler}/>
            </div>
        )
    }
}