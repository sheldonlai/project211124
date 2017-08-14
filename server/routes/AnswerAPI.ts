import {NextFunction, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {AuthRequest, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {AnswerDto} from "../dtos/q&a/AnswerDto";
import {User} from "../models/User";
import {IAnswerService} from "../services/AnswerService";
import {CommentDto} from "../dtos/q&a/CommentDto";

export class AnswerAPI extends BaseAPI{
	private service : IAnswerService;
	public router: Router;
	constructor(service: IAnswerService){
		super();
		this.router = Router();
		this.service = service;
        this.router.post(APIUrls.CreateAnswer, mustBeAuthenticated, this.CreateAnswer);
        this.router.put(APIUrls.UpdateAnswer, mustBeAuthenticated, this.UpdateAnswer);
        this.router.put(APIUrls.UpVoteAnswer, mustBeAuthenticated, this.UpVoteAnswer);
        this.router.put(APIUrls.DownVoteAnswer, mustBeAuthenticated, this.DownVoteAnswer);
        this.router.put(APIUrls.CreateAnswerComment, mustBeAuthenticated, this.CreateComment);
        this.router.put(APIUrls.UpdateAnswerComment, mustBeAuthenticated, this.UpdateComment);
        this.router.put(APIUrls.DeleteAnswerComment, mustBeAuthenticated, this.DeleteComment);
	}

	public CreateAnswer = (req: AuthRequest, res: Response, next: NextFunction) => {
		let answer : AnswerDto = req.body;
		let user : User = req.user;
		let result = this.service.createAnswer(user, answer);

		this.respondPromise(result, res, next);
    };
    public UpdateAnswer = (req: AuthRequest, res: Response, next: NextFunction) => {
		let answer : AnswerDto = req.body;
		let user : User = req.user;
		let result = this.service.updateAnswer(user, answer);

		this.respondPromise(result, res, next);
	};

	public UpVoteAnswer = (req: AuthRequest, res: Response, next: NextFunction) => {
		let answer : AnswerDto = req.body;
		let user : User = req.user;
		let result = this.service.upVoteAnswer(user, answer._id);

		this.respondPromise(result, res, next);
	};

	public DownVoteAnswer = (req: AuthRequest, res: Response, next: NextFunction) => {
		let answer : AnswerDto = req.body;
		let user : User = req.user;
		let result = this.service.downVoteAnswer(user, answer._id);

		this.respondPromise(result, res, next);
	}

	public CreateComment = (req: AuthRequest, res: Response, next: NextFunction) => {
		let answer: AnswerDto = req.body;
		let result = this.service.createAnswerComment(answer);

		this.respondPromise(result, res, next);
	}

	public UpdateComment = (req: AuthRequest, res: Response, next: NextFunction) => {
		let answerId: string = req.body.answerId;
		let updatedComment: CommentDto = req.body.updatedComment;
		let user: User = req.user;
		let commentIndx: number = req.body.commentIndx;
		let result = this.service.UpdateAnswerComment(commentIndx, answerId, user, updatedComment);

		this.respondPromise(result, res, next);
	}

	public DeleteComment = (req: AuthRequest, res: Response, next: NextFunction) => {
		let answerId: string = req.body.answerId;
		let user: User = req.user;
		let commentIndx: number = req.body.commentIndx;
		let result = this.service.DeleteAnswerComment(commentIndx, answerId, user);

		this.respondPromise(result, res, next);
	}
}