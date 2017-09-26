import * as React from "react";
import Typography from "material-ui/Typography";
import {DisplayField} from "../../../components/Forms/DisplayField";
import {DropDownForum} from "../../../components/Forms/DropDownForum";
import {ForumDto} from "../../../../../server/dtos/sharedDtos/ForumDto";
import {QuestionDto} from "../../../../../server/dtos/q&a/QuestionDto";
import {QuestionDifficulty, SearchQuestionQuery} from "../../../../../server/models/Question"
import {TagsSelector} from "../../../components/TagsComponent/TagsComponent";
import {CategoryTypeEnum} from "../../../../../server/enums/CategoryTypeEnum";
import {QuestionDifficultyMenu} from "./QuestionDifficultyMenu";
import {DifficultyLevel, QuestionEducationLevel} from "../../../../../server/enums/QuestionEducationLevel";
import Grid from "material-ui/Grid";
import {DropDownSelect} from "../../../components/Forms/DropDownSelect";
import {getDropDownDataFromStringEnum} from "../../../utils/utils";

interface props {
    SearchQuestionObj: SearchQuestionQuery,
    UpdateQuestionObj: (searchQuestionObj: SearchQuestionQuery) => void,
}

interface state {
    tags: string[],
    category: CategoryTypeEnum,
    difficulty: QuestionDifficulty,
}

/*
 searchQuestionObj: {
 _id: string,
 title: string,
 author: UserDto,
 content: RawDraftContentState,
 //createdUtc: Date;
 tags: any[],
 difficulty: QuestionDifficulty,
 category: CategoryTypeEnum,
 }
*/

let FieldNames = [{FieldName: 'Question Title', ActualName:'title'},
    {FieldName: 'Author', ActualName: 'author'},
    {FieldName: 'Question Content', ActualName: 'content'}];

export class AdvancedSearchEditor extends React.Component<props, state> {
    ForumVector:ForumDto[];
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            category: CategoryTypeEnum.NOT_SPECIFIED,
            difficulty: {
                educationLevel: QuestionEducationLevel.NOT_SPECIFIED,
                difficultyLevel: DifficultyLevel.NOT_SPECIFIED,
            },
        };
        this.ForumVector = FieldNames.map((Field) => ({FieldName: Field.FieldName, ActualFieldName: Field.ActualName, UpdateHandler: this.UpdateHandler, value: undefined}));
    }

    UpdateHandler = (key: string, element: any) => {
        let tmpObj = {...this.props.SearchQuestionObj};
        tmpObj[key] = element;
        this.props.UpdateQuestionObj(tmpObj);
    };

    updateTags = (tags: string[]) => {
        this.setState({tags: tags});
        this.UpdateHandler("tags", tags);
    };

    onDifficultyChange = (difficulty: QuestionDifficulty) => {
        this.setState({difficulty});
        this.UpdateHandler("difficulty", difficulty);
    };

    onCategoryChange = (category: CategoryTypeEnum) => {
        this.setState({category: category});
        this.UpdateHandler("category", category);
    }

    render() {
        return (
            <div>
                <DropDownForum
                    data = {this.ForumVector}
                />
                <DropDownSelect
                    placeholder="Category"
                    data={getDropDownDataFromStringEnum(CategoryTypeEnum)}
                    onChange={this.onCategoryChange}
                    value={this.state.category}
                />
                <TagsSelector selectedTags={this.state.tags} onChange={this.updateTags}/>
                <QuestionDifficultyMenu difficulty={this.state.difficulty}
                                        onDifficultyChange={this.onDifficultyChange}/>
            </div>
        )
    }
}