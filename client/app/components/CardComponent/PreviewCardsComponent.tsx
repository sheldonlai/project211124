import * as React from "react";
import {FrontEndQuestionModels} from "../../models/QuestionModels";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;
import {FrontEndStoryModels} from "../../models/StoryModels";
import StoryPreview = FrontEndStoryModels.StoryPreview;
import {getLengthFromBoxes, sortListToGetSameWidthEachRow} from "../../utils/WideBoxUtils";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import {CustomLink} from "../RoutingComponents/CustomLink";
import {CustomCard} from "./CardComponent";
import {Preview} from "../../models/CommonModels";
import {PRIMARY_COLOR} from "../../views/router";

export interface props {
    list: Preview[];
    label: string;
    labelType?: string;
    trim?: boolean; // if there is a non fully populated trim the bottom row
    maxBlock?: number;
}

interface state {
    width: number;
    height: number;
}

export class PreviewCardsComponent extends React.Component<props, state> {
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

    findOptimalMaxBlock = () => {

    };

    renderBoxes = () => {

    }

    render() {
        const boxWidth = 266;
        const bodyMargin = 16;
        let width = this.state.width;
        let n = Math.floor((width - bodyMargin) / boxWidth);
        n = n > this.props.maxBlock ? this.props.maxBlock : n;
        let list = sortListToGetSameWidthEachRow(this.props.list, n, this.props.trim);
        let listLength = getLengthFromBoxes(list);
        // if empty list set listlength to n
        listLength = listLength > 0? listLength : n;

        // determine what the maximum width is used for
        let maxWidth = (n > listLength) ? boxWidth * listLength : n * boxWidth;
        maxWidth += bodyMargin;
        const labelType = this.props.labelType ? this.props.labelType : "display1";
        return (
            <Grid container justify="center">
                {this.props.children &&
                <Grid item style={{marginTop: 16, width: maxWidth}}>
                    {this.props.children}
                </Grid>}
                <Grid item style={{marginTop: 16, width: maxWidth}}>
                    <Typography type={labelType} style={{marginBottom: 10, color: PRIMARY_COLOR}}>
                        {this.props.label}
                    </Typography>
                    {
                        !this.props.list || this.props.list.length === 0 ?
                            <Typography type={'body1'}>
                                There are currently no posts
                            </Typography> :
                            <Grid container justify="flex-start">
                                {list.map((e) => (
                                    <Grid item key={e.element.title}>
                                        <div style={{display: "inline-block"}}>
                                            <CustomLink to={e.element.toLink()}>
                                                <CustomCard
                                                    title={e.element.title}
                                                    content={e.element.content}
                                                    date={e.element.createdUtc}
                                                    wide={n > 1 && e.wide}
                                                />
                                            </CustomLink>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                    }


                </Grid>
            </Grid>
        );
    }
}