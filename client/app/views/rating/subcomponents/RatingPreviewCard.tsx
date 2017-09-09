import * as React from "react";
import {CustomLink} from "../../../components/RoutingComponents/CustomLink";
import Typography from "material-ui/Typography";
import ReactStars from 'react-stars';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import {TeammatePreviewDto} from "../../../../../server/dtos/rating/TeammatePreviewDto";
import {Routes} from "../../../constants/Routes";
import {convertEnumStringToViewString} from "../../../utils/utils";
import {UniversityYearEnum} from "../../../../../server/enums/UniversityYearEnum";
import {SatisfactionComponent} from "../../../components/Satisfaction/SatisfactionComponent";
import {DistributionBar} from "../../../components/Satisfaction/DistributionBar";
import {SentenceStringBolder} from "../../../components/SentenceStringBolder";

interface props {
    preview: TeammatePreviewDto;
    KeyTerms?: string[];
}

export class RatingPreviewCard extends React.Component<props>{
    render(){
        const preview = this.props.preview;
        const grey = {color: "grey"};
        return (
            <CustomLink to={Routes.rating.replace(":id", preview._id)}>
                <Card style={{padding: 10, marginTop: 20}}>
                    <CardContent>
                        <Typography type="headline" style={{textTransform: "capitalize"}}>
                            {preview.firstName + " " + preview.lastName}
                        </Typography>
                        <SatisfactionComponent readonly={true} satisfy={undefined}/>
                        <DistributionBar faction={this.props.preview.averageRating} />
                        {
                            preview.university &&
                            <div>
                                <Typography style={grey}
                                            type="body1">{preview.university.name}</Typography>
                                <Typography style={grey} type="body1">
                                    {convertEnumStringToViewString(UniversityYearEnum[preview.year])}
                                </Typography>
                            </div>
                        }
                        {this.props.KeyTerms && this.props.preview.description && <SentenceStringBolder KeyTerms={this.props.KeyTerms} InputSentence={this.props.preview.description}/>}
                    </CardContent>
                </Card>
            </CustomLink>
        );
    }
}