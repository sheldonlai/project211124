import {NextFunction, Request, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {AuthRequest, maybeAuthenticated, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {IStoryService} from "../services/StoryService";
import {StoryDto} from "../dtos/story/StoryDto";

export class StoryAPI extends BaseAPI {

    private service : IStoryService;
    public router: Router;
    constructor(service: IStoryService) {
        super();
        this.router = Router();
        this.service = service;
        this.router.get(APIUrls.getStoryPreviews, maybeAuthenticated, this.getStoryPreviews);
        this.router.get(APIUrls.getStory, maybeAuthenticated, this.getStory);
        this.router.post(APIUrls.createStory, mustBeAuthenticated, this.createStory);
        this.router.put(APIUrls.updateStory, mustBeAuthenticated, this.updateStory);
        this.router.post(APIUrls.createStoryComment, mustBeAuthenticated, this.createStoryComment);
        this.router.put(APIUrls.updateStoryComment, mustBeAuthenticated, this.updateStoryComment);
        this.router.put(APIUrls.UpVoteStory, mustBeAuthenticated, this.upVoteStory);
        this.router.put(APIUrls.DownVoteStory, mustBeAuthenticated, this.downVoteStory);
    }

    public getStoryPreviews = (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        const promise = this.service.getStoryPreview(user);
        this.respondPromise(promise, res, next);
    };

    public getStory = (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        const id = req.params.id;
        const promise = this.service.getStoryByID(id, user);
        this.respondPromise(promise, res, next);
    };

    public updateStory = (req: Request, res: Response, next: NextFunction) => {
        const story = req.body;
        const user = req.user;
        const promise = this.service.updateStory(story, user);
        this.respondPromise(promise, res, next);
    };

    public createStory = (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        const dto = req.body;
        const promise = this.service.createStory(dto, user);
        this.respondPromise(promise, res, next);
    };

    public createStoryComment = (req: AuthRequest, res: Response, next: NextFunction) => {
        const storyId = req.params.id;
        const user = req.user;
        const dto = req.body;
        const promise = this.service.createComment(dto, storyId, user);
        this.respondPromise(promise, res, next);
    };

    public updateStoryComment = (req: AuthRequest, res: Response, next: NextFunction) => {
        const storyId = req.params.id;
        const currentUser = req.user;
        const dto = req.body;
        const promise = this.service.updateComment(dto, storyId, currentUser);
        this.respondPromise(promise, res, next);
    };

    public upVoteStory =  (req: AuthRequest, res: Response, next: NextFunction) => {
        const story: StoryDto = req.body;
        const user  = req.user;
        const promise = this.service.upVoteStory(story._id, user);
        this.respondPromise(promise, res, next);
    };

    public downVoteStory =  (req: AuthRequest, res: Response, next: NextFunction) => {
        const story: StoryDto = req.body;
        const user  = req.user;
        const promise = this.service.downVoteStory(story._id, user);
        this.respondPromise(promise, res, next);
    };
}
