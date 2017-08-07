import * as React from "react";
import {CustomLink} from "../../../components/CustomLink";
import Typography from "material-ui/Typography";
import ReactStars from 'react-stars';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import {TeammatePreviewDto} from "../../../../../server/dtos/rating/TeammatePreviewDto";
import {Routes} from "../../../constants/Routes";
import {convertEnumStringToViewString} from "../../../utils/utils";
import {UniversityYearEnum} from "../../../../../server/enums/UniversityYearEnum";

interface props {
    preview: TeammatePreviewDto;
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
                        <ReactStars size={34} value={preview.averageRating} edit={false}/>
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
                    </CardContent>
                </Card>
            </CustomLink>
        );
    }
}