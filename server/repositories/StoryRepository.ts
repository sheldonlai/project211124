import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {IStory, Story, StoryComment, StoryModel} from "../models/Story";
import {isNullOrUndefined} from "util";
import {AppError} from "../errors/AppError";
import {ClientError} from "../errors/HttpStatus";
import {UserStoryVote, UserStoryVoteModel} from "../models/UserStoryVote";
import {User} from "../models/User";

export interface IStoryRepository extends IBaseRepository<Story> {
    getStoryByTitle(title: string): Promise<Story>;
    getStoriesByAuthor(user: User): Promise<Story[]>;
    findOneAndUpdateVoteStory(userStoryVote: UserStoryVote): Promise<Story>;
    increaseViewCount(questionId: any) :Promise<any>;
}

export class StoryRepository extends BaseRepository<Story, IStory> implements IStoryRepository {

    constructor() {
        super(StoryModel);
    }

    getStoryByTitle(title: string): Promise<Story> {
        return StoryModel.findOne({title: title}).lean().exec()
            .then((question: Story) => this.applyAdditionalFunction(question))
            .then((question: Story) => {
                return this.getModel(question);
            });
    }

    getStoriesByAuthor(user: User): Promise<Story[]> {
        return StoryModel.find({author: user}).lean().exec()
            .then((stories: Story[]) => Promise.all(stories.map((q) => this.applyAdditionalFunction(q))))
            .then((question: Story[]) => {
                return this.getModels(question);
            });
    }

    findOneAndUpdateVoteStory(userStoryVote: UserStoryVote): Promise<Story> {
        return UserStoryVoteModel.findOneAndUpdate(
            {user: userStoryVote.user, story: userStoryVote.story},
            userStoryVote, {upsert: true}).then((obj: UserStoryVote) => {
            return this.getById(userStoryVote.story);
        });
    }

    increaseViewCount(questionId: any) :Promise<any> {
        return StoryModel.findByIdAndUpdate(questionId,{$inc: {views:1}}).then(() => undefined);
    }

    protected applyRestriction(story: Story): Story {
        if (story.author) {
            delete story.author.local;
        }
        story.comments = story.comments.map((comment: StoryComment) => {
            delete comment.commentBy.local;
            return comment;
        });
        return story;
    }

    protected applyAdditionalFunction(story: Story): Promise<Story> {
        if (isNullOrUndefined(story)){
            throw new AppError("Cannot find the specified question", ClientError.BAD_REQUEST)
        }
        return UserStoryVoteModel.find({question: story}).lean().exec()
            .then((userVote: UserStoryVote[]) => {
                const upVote = userVote.filter((userVote) => userVote.upVote == true).length;
                const downVote = userVote.length - upVote;
                story.upVotes = upVote;
                story.downVotes = downVote;
                return story;
            });
    }
}