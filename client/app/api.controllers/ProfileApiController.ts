import {ApiController} from "./ApiController";
import {APIUrls} from "../../../server/urls";
import {FrontEndStoryModels} from "../models/StoryModels";
import StoryPreview = FrontEndStoryModels.StoryPreview;
import {FrontEndQuestionModels} from "../models/QuestionModels";
import QuestionPreview = FrontEndQuestionModels.QuestionPreview;

class ProfileApiControllerClass extends ApiController{
    fetchProfilePage (username: string) {
        return this.get(APIUrls.getProfile.replace(":username", username)).then(res => {
            // convert them into previews
            res.data.stories = res.data.stories.map(story => new StoryPreview(story));
            res.data.questions = res.data.questions.map(question =>
                QuestionPreview.fromQuestionPreviewDto(question));
            return res;
        });
    }
}

export const ProfileApiController = new ProfileApiControllerClass();