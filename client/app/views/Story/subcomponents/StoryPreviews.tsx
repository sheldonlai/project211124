import * as React from "react";
import {getLengthFromBoxes, isElementWide, sortListToGetSameWidthEachRow} from "../../../utils/WideBoxUtils";
import Typography from "material-ui/Typography";
import {CustomLink} from "../../../components/CustomLink";
import {CustomCard} from "../../../components/CardComponent/CardComponent";
import {Routes} from "../../../constants/Routes";
import Grid from "material-ui/Grid";
import {FrontEndStoryModels} from "../../../models/StoryModels";
import StoryPreview = FrontEndStoryModels.StoryPreview;

interface state {
    height: number;
    width: number;
}

interface props {
    list: StoryPreview[];
    label: string;
    maxBlock?: number;
    trim?: boolean;
}

export class StoryPreviews extends React.Component<props, state> {

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

    prepareStoryUrl = (url: string, preview: StoryPreview) => {
        return url.replace(":id", preview._id).replace(":name", preview.title)
    };

    render() {
        if (!this.props.list) return undefined;
        const bodyMargin = 16;
        let width = this.state.width;
        width = width;
        let n = Math.floor((width - bodyMargin) / (250 + 16));
        n = n > this.props.maxBlock? this.props.maxBlock : n;
        if (this.props.list.length < n){
            let length = getLengthFromBoxes(this.props.list)
            n = n > length? length : n;
        }
        let list = sortListToGetSameWidthEachRow(this.props.list, n, this.props.trim);
        return (
            <Grid container justify="center">
                <Grid item style={{marginTop: 16, width: n * 266}}>
                    <Typography type="display2" style={{marginBottom: 10}}>{this.props.label}</Typography>
                    <Grid container justify="center">
                        {list.map((e: StoryPreview) => (
                            <Grid item key={e.title}>
                                <div style={{display: "inline-block"}}>
                                    <CustomLink to={this.prepareStoryUrl(Routes.story_by_id, e)}>
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