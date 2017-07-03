import * as React from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import {CustomLink} from "../../../components/CustomLink";
import {CustomCard} from "../../../components/CardComponent/CardComponent";
import {Routes} from "../../../constants/Routes";
import Grid from "material-ui/Grid";
export interface QuestionPreviewCardsComponentProps {
    list: QuestionPreview[];
}
export class QuestionPreviewCardsComponent extends React.Component<QuestionPreviewCardsComponentProps> {
    render() {
        if (!this.props.list) return undefined;
        return (
            <Grid container>
                {this.props.list.map((e: QuestionPreview) => (
                    <Grid item key={e.title}>
                        <div style={{marginTop: 16, display: "inline-block"}}>
                            <CustomLink to={Routes.question_by_id.replace(':id', e._id)}>
                                <CustomCard
                                    title={e.title}
                                    content={e.content}
                                    date={e.createdUtc}
                                />
                            </CustomLink>
                        </div>
                    </Grid>
                ))}
            </Grid>
        );
    }
}