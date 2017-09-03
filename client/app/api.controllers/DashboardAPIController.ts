

import {ApiController} from "./ApiController";
import {APIUrls} from "../../../server/urls";
import {AxiosPromise} from "axios";
import {DashboardDto} from "../../../server/dtos/dashboard/DashboardDto";
import {QuestionDto} from "../../../server/dtos/q&a/QuestionDto";
import {StoryDto} from "../../../server/dtos/story/StoryDto";
import {convertFromRaw, RawDraftContentState} from "draft-js";
import {FrontEndStoryModels} from "../models/StoryModels";
import StoryPreview = FrontEndStoryModels.StoryPreview;
import {FrontEndQuestionModels} from "../models/QuestionModels";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;

class DashboardAPIControllerClass extends ApiController {
    fetchDashboardData(): AxiosPromise {
        return this.get(APIUrls.FetchDashboard).then((res) => {
            let data: DashboardDto = res.data;
            let stories = data.stories.map(story => new StoryPreview(story));
            let questions = data.questions.map(question => new QuestionPreview(question));
            res.data = {stories, questions};
            return res;
        });
    }

    private convertRawContentToState = (element: StoryDto| QuestionDto) => {
        let newObj: any = {...element};
        newObj.content = this.convertRawToText(element.content);
        return newObj;
    };

    private convertRawToText(rawState: RawDraftContentState): string {
        if (!rawState.entityMap) rawState.entityMap = {};
        const content = convertFromRaw(rawState);
        return content.getPlainText();
    }
}

export const DashboardAPIController = new DashboardAPIControllerClass();