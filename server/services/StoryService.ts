import {IStoryRepository} from "../repositories/StoryRepository";
import {StoryDto} from "../dtos/story/StoryDto";
import {Story} from "../models/Story";
import {User} from "../models/User";
import {AppError} from "../errors/AppError";
import {BaseService} from "./BaseService";
import {ClientError} from "../errors/HttpStatus";
import {ITagRepository} from "../repositories/TagRepository";
import {ITag} from "../models/Tags";
import {UserStoryVote} from "../models/UserStoryVote";
import {CommentDto} from "../dtos/q&a/CommentDto"
import {IUserRepository} from "../repositories/UserRepository";
import {UserPreferences} from "../models/UserPerferences";
import {StoryPreviewCollectionsDto} from "../dtos/story/StoryPreviewCollectionsDto";
import {getQuestionsQueryByPreference} from "../elasticSearch/QuestionQueries";
import * as _ from "lodash";

export interface IStoryService {
    getStoryPreview(user?: User): Promise<StoryPreviewCollectionsDto>;

    createStory(story: StoryDto, user: User): Promise<StoryDto>;

    getStoryByID(name: string, user?: User): Promise<StoryDto>;

    getUserStories(currentUser: User): Promise<StoryDto[]>;

    updateStory(story: StoryDto, user: User): Promise<StoryDto>;

    upVoteStory(storyId: string, user: User): Promise<StoryDto>;

    downVoteStory(storyId: string, user: User): Promise<StoryDto>;

    createComment(comment: CommentDto, storyId: string, user: User): Promise<StoryDto>;

    updateComment(comment: CommentDto, storyId: string, user: User): Promise<StoryDto>;

    deleteComment(comment: CommentDto, storyId: string, user: User): Promise<StoryDto>;
}

export class StoryService extends BaseService implements IStoryService {
    constructor(private storyRepository: IStoryRepository,
                private tagRepository: ITagRepository,
                private userRepository: IUserRepository,) {
        super();
    }

    async getStoryPreview(user?: User): Promise<StoryPreviewCollectionsDto> {
        let promises = [];
        if (user) {
            let preferences = await this.userRepository.getUserPreference(user);
            preferences = preferences.question_pref ? preferences : new UserPreferences();
            promises.push(this.storyRepository.search(getQuestionsQueryByPreference(preferences)));
            promises.push((this.storyRepository.getStoriesByAuthor(user)));
        } else {
            let preferences = new UserPreferences();
            promises.push(this.storyRepository.search(getQuestionsQueryByPreference(preferences)));
        }
        promises.push(this.storyRepository.getAll({sort: "-createdUtc"}));


        return Promise.all(promises).then((result) => {
            let recommendedPreviews = result[0] ? result[0].map(q => Story.fromObject(q).toPreviewDto()) : [];
            let myStories = result[1] ? result[1].map(q => Story.fromObject(q).toPreviewDto()) : [];
            return {
                recommendedPreviews,
                myStories
            };
        })
    }

    createStory(story: StoryDto, currentUser: User): Promise<StoryDto> {
        return this.tagRepository.getTags(story.tags).then((tags: ITag[]) => {
            let storyObject = new Story(
                story.title, story.content, currentUser, tags,
                story.isPublished, story.publicityStatus, story.category
            );
            return this.storyRepository.create(storyObject);
        })
    }

    getStoryByID(id: string, user?: User): Promise<StoryDto> {
        return this.storyRepository.getById(id).then((story: Story) => {
            this.storyRepository.increaseViewCount(story._id).then(() => {
                // TODO: some kind of logging
                console.log("increased view");
            });
            if (user) {
                this.userRepository.updateQuestionVector(user, story).then(() => {
                    // TODO: some kind of logging
                    console.log("Updated Story Vector");
                });
            }
            return story;
        });
    }

    getUserStories(currentUser: User): Promise<StoryDto[]> {
        return this.storyRepository.getStoriesByAuthor(currentUser).then((storys: Story[]) => {
            return storys;
        });

    }

    async updateStory(storyDto: StoryDto, user: User): Promise<StoryDto> {
        let storyFound = await this.storyRepository.getById(storyDto._id);
        this.checkPermissionForModification(storyDto, storyFound, user);

        // editable fields
        storyFound.content = storyDto.content;
        storyFound.title = storyDto.title;
        storyFound.publicityStatus = storyDto.publicityStatus;
        storyFound.category = storyDto.category;
        storyFound.lastEditedUtc = new Date();

        //update tags
        if (storyDto.tags.length <= 5) {
            if (_.intersection(storyDto.tags, storyFound.tags).length !== storyDto.tags.length) {
                storyFound.tags = await this.tagRepository.getTags(storyDto.tags);
            } else {
                // delete the tags if possible
                delete storyFound.tags;
            }
        } else {
            throw new AppError("You cannot hae more than 5 tags.", ClientError.BAD_REQUEST);
        }

        return this.storyRepository.update(storyFound)
            .then((story) => this.storyRepository.getById(story._id));

    }

    upVoteStory(storyId: string, user: User): Promise<StoryDto> {
        return this.voteHelper(storyId, user, true);
    }

    downVoteStory(storyId: string, user: User): Promise<StoryDto> {
        return this.voteHelper(storyId, user, false);
    }

    voteHelper(storyId: string, user: User, up: boolean) {
        let vote = new UserStoryVote(user._id, storyId, up);
        return this.storyRepository.findOneAndUpdateVoteStory(vote).then((story: Story) => {
            return story;
        });
    }

    createComment(comment: CommentDto, storyId: string, user: User): Promise<StoryDto> {
        return this.storyRepository.getById(storyId).then((storyFound: Story) => {
            let now = new Date();
            comment.createdUtc = now;
            comment.lastEditedUtc = now;
            storyFound.comments.push(comment);
            return this.storyRepository.update(storyFound).then((storyFound: Story) => {
                return this.storyRepository.getById(storyFound._id);
            });
        });
    }

    updateComment(comment: CommentDto, storyId: string, user: User): Promise<StoryDto> {
        return this.storyRepository.getById(storyId).then((storyFound: Story) => {
            const commentIndex = _.findIndex(storyFound.comments, (c) => c._id.toString() === comment._id);
            const commentFound = storyFound.comments[commentIndex];
            if (!commentFound.commentBy._id.equals(user._id)) {
                throw new AppError("You are not the owner of this story!", ClientError.UNAUTHORIZED);
            }
            else {
                let now = new Date();
                delete storyFound.comments[commentIndex].createdUtc;
                storyFound.comments[commentIndex].lastEditedUtc = now;
                storyFound.comments[commentIndex] = comment;
                return this.storyRepository.update(storyFound);
            }
        })
    }

    deleteComment(comment: CommentDto, storyId: string, user: User): Promise<StoryDto> {
        return this.storyRepository.getById(storyId).then((storyFound: Story) => {
            const commentIndex = _.findIndex(storyFound.comments, (c) => c._id.toString() === comment._id);
            const commentFound = storyFound.comments[commentIndex];
            if (!commentFound.commentBy._id.equals(user._id)) {
                throw new AppError("You are not the owner of this story!", ClientError.UNAUTHORIZED);
            } else {
                storyFound.comments.splice(commentIndex, 1);
                return this.storyRepository.update(storyFound);
            }
        })
    }

    private checkPermissionForModification = (storyDto: StoryDto, storyObj: Story, currentUser: User) => {
        if (storyObj.author._id.toString() != currentUser._id.toString()) {
            throw new AppError("You are not the owner of this story!")
        }
        if (currentUser.username != storyDto.author.username) {
            throw new AppError("You cannot change the username of the author")
        }
        return true;
    };

    protected applyUpdateRestrictions(storyDto: StoryDto, storyInDB: Story): StoryDto {
        storyDto._id = undefined;
        storyDto.author = undefined;
        if (storyDto.isPublished) {
            delete storyDto.isPublished
        }
        if (storyDto.publicityStatus !== storyInDB.publicityStatus) {
            throw new AppError("You cannot change the publicity status", ClientError.BAD_REQUEST)
        }
        delete storyDto.publicityStatus;
        return storyDto;
    }
}

