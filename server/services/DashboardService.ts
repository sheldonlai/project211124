import {getHottestQuery} from "../elasticSearch/CommonQuery";
import {BaseService} from "./BaseService";
import {IQuestionRepository} from "../repositories/QuestionRepository";
import {IStoryRepository} from "../repositories/StoryRepository";
import {DashboardDto} from "../dtos/dashboard/DashboardDto";
import {Story} from "../models/Story";
import {Question} from "../models/Question";

export interface IDashboardService {
    getHottestStoriesAndQuestions: () => Promise<DashboardDto>;
}

export class DashboardService extends BaseService implements IDashboardService {
    constructor(private questionRepo: IQuestionRepository,
                private storyRepo: IStoryRepository,) {
        super();
    }

    getHottestStoriesAndQuestions = (): Promise<DashboardDto> => {
        let hotQuery = getHottestQuery();
        let promises = [];
        promises.push(this.questionRepo.search(hotQuery));
        promises.push(this.storyRepo.search(hotQuery));
        return Promise.all(promises).then((results) => {
            let questions = results[0]
            let stories = results[1];

            return {
                stories: stories,
                questions: questions
            };
        })

    }
}

