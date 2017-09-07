import {getHottestQuery} from "../elasticSearch/CommonQuery";
import {BaseService} from "./BaseService";
import {IQuestionRepository} from "../repositories/QuestionRepository";
import {IStoryRepository} from "../repositories/StoryRepository";
import {DashboardDto} from "../dtos/dashboard/DashboardDto";
import {SearchScoreModel} from "../models/Base/SearchScoreModel";
import {StoryDto} from "../dtos/story/StoryDto";
import {Question} from "../models/Question";
import {Story} from "../models/Story";

export interface IDashboardService {
    getHottestStoriesAndQuestions(): Promise<DashboardDto>;
}

export class DashboardService extends BaseService implements IDashboardService {
    constructor(private questionRepo: IQuestionRepository,
                private storyRepo: IStoryRepository,) {
        super();
    }

    getHottestStoriesAndQuestions(): Promise<DashboardDto> {
        let hotQuery = getHottestQuery();
        let promises = [];
        promises.push(this.questionRepo.searchReturnWithScore(hotQuery));
        promises.push(this.storyRepo.searchReturnWithScore(hotQuery));
        return Promise.all(promises).then((results) => {
            let questions = results[0]
                .sort((a, b) => b.score - a.score)
                .map(q=> {
                    q.object = Question.fromObject(q.object).toPreviewDto();
                    return q;
                });
            let stories = results[1]
                .sort((a, b) => b.score - a.score)
                .map(s => {
                    s.object = Story.fromObject(s.object).toPreviewDto();
                    return s;
                });
            let i = 0;
            let j = 0;
            while (i + j < 10 && i + j < questions.length + stories.length) {
                if (stories.length + questions.length < 10){
                    i = questions.length - 1;
                    j = stories.length - 1;
                }
                if (stories.length === j){
                    // story list exhausted
                    i++;
                } else if (questions.length === i){
                    // question list exhausted
                    j++;
                } else if (questions[i].score > stories[j].score) {
                    // question score is higher than story
                    i++;
                } else {
                    // story score is higher OR equal to question
                    j++;
                }
            }
            questions = questions.slice(0, i)
            stories = stories.slice(0, j);

            return {
                questions,
                stories
            };
        });

    }
}

