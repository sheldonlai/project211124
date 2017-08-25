import * as React from "react";
import {FrontEndQuestionModels} from "../../../models/QuestionModels";
import {CustomLink} from "../../../components/CustomLink";
import {CustomCard} from "../../../components/CardComponent/CardComponent";
import {Routes} from "../../../constants/Routes";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import {isElementWide, sortListToGetSameWidthEachRow} from "../../../utils/WideBoxUtils";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import {convertDateToString} from "../../../utils/DateUtils";

export interface QuestionPreviewCardsComponentProps {
    list: QuestionPreview[];
    label: string;
    trim?: boolean; // if there is a non fully populated trim the bottom row
    maxWidth?: number;
}

interface state {
    width: number;
    height: number;
}

export class QuestionPreviewCardsComponent extends React.Component<QuestionPreviewCardsComponentProps, state> {

    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0};
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    };

    prepareToLink = (id: string, title: string): string => {
        title = encodeURIComponent(title).replace(/%20/g, '-');//title.replace(new RegExp(' ', 'g'), "-");
        return Routes.question_by_id.replace(':id', id).replace(':name', title)
    };

    render() {
        if (!this.props.list) return undefined;
        const bodyMargin = 16;
        let width = this.state.width;
        width = this.props.maxWidth && width > this.props.maxWidth ? this.props.maxWidth : width;
        let n = Math.floor((width - bodyMargin) / (250 + 16));
        let list = sortListToGetSameWidthEachRow(this.props.list, n, this.props.trim);
        return (
            <Grid container justify="center">
                <Grid item style={{marginTop: 16, width: n * 266}}>
                    <Typography type="display2" style={{marginBottom: 10}}>{this.props.label}</Typography>
                    <Grid container justify="center">
                        {list.map((e: QuestionPreview) => (
                            <Grid item key={e.title}>
                                <div style={{display: "inline-block"}}>
                                    <CustomLink to={this.prepareToLink(e._id, e.title)}>
                                        <CustomCard
                                            title={e.title}
                                            content={e.content}
                                            date={e.createdUtc}
                                            wide={n > 1 && isElementWide(e)}
                                        />
                                    </CustomLink>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}