import * as React from "react";
import Typography from "material-ui/Typography";
import {DisplayField} from "../../../components/Forms/DisplayField";
import {DropDownForum} from "../../../components/Forms/DropDownForum";
import {ForumDto} from "../../../../../server/dtos/sharedDtos/ForumDto";
import {QuestionDto} from "../../../../../server/dtos/q&a/QuestionDto";

interface props {
    SearchQuestionObj: Object,
    UpdateQuestionObj: (SearchQuestionObj: Object) => void,
}

interface state {
}

/*
 SearchQuestionObj: {
 _id: "",
 title: "",
 author: undefined,
 content: undefined,
 //createdUtc: Date;
 tags: [],
 difficulty: undefined,
 category: undefined,
 }
*/

let FieldNames = [{FieldName: 'Question Title', ActualName:'title'},
    {FieldName: 'Author', ActualName: 'author'},
    {FieldName: 'Question Content', ActualName: 'content'},
    {FieldName: 'Tag(s)', ActualName: 'tags'}];

export class AdvancedSearchEditor extends React.Component<props, state> {
    ForumVector:ForumDto[];
    constructor(props) {
        super(props);
        this.ForumVector = FieldNames.map((Field) => ({FieldName: Field.FieldName, ActualFieldName: Field.ActualName, UpdateHandler: this.UpdateHandler, value: undefined}));
    }

    UpdateHandler = (key: string, element: any) => {
        let tmpObj = {...this.props.SearchQuestionObj};
        tmpObj[key] = element;
        this.props.UpdateQuestionObj(tmpObj);
    };

    render() {
        return (
            <div>
                <DropDownForum
                    data = {this.ForumVector}
                />
            </div>
        )
    }
}