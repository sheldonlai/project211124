import * as React from "react";
import {DropDownForum} from "../../../components/Forms/DropDownForum";
import {ForumDto} from "../../../../../server/dtos/sharedDtos/ForumDto";
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

let FieldNames : any = [{FieldName: 'Question Title', ActualName:'title'},
    {FieldName: 'Author', ActualName: 'author'},
    {FieldName: 'Question Content', ActualName: 'content'}];

export class QuestionAdvancedSearchEditor extends React.Component<props, state> {
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
        this.ForumVector = FieldNames.map((Field) =>
            ({
                FieldName: Field.FieldName, ActualFieldName:
                Field.ActualName, value: undefined
            }));
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
    };

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <DropDownForum
                            data = {this.ForumVector}
                            updateHandler={this.UpdateHandler}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <DropDownSelect
                            placeholder="Category"
                            data={getDropDownDataFromStringEnum(CategoryTypeEnum)}
                            onChange={this.onCategoryChange}
                            value={this.state.category}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TagsSelector selectedTags={this.state.tags} onChange={this.updateTags}/>
                    </Grid>
                    <Grid item sm={4}>
                        <QuestionDifficultyMenu difficulty={this.state.difficulty}
                                                onDifficultyChange={this.onDifficultyChange}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}