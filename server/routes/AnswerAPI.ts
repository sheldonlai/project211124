import {NextFunction, Response, Router} from "express";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {AuthRequest, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {AnswerDto} from "../dtos/q&a/AnswerDto";
import {User} from "../models/User";
import {IAnswerService} from "../services/AnswerService";

export class AnswerAPI extends BaseAPI{
	private service : IAnswerService;

	constructor(router: Router, service: IAnswerService){
		super();
		this.service = service;
		router.post(APIUrls.CreateAnswer, mustBeAuthenticated, this.CreateAnswer);
		router.put(APIUrls.UpdateAnswer, mustBeAuthenticated, this.UpdateAnswer);
		router.put(APIUrls.UpVoteAnswer, mustBeAuthenticated, this.UpVoteAnswer);
		router.put(APIUrls.DownVoteAnswer, mustBeAuthenticated, this.DownVoteAnswer);
	}

	public CreateAnswer = (req: AuthRequest, res: Response, next: NextFunction) => {
		let answer : AnswerDto = req.body;
		let user : User = req.user;
		let result = this.service.createAnswer(user, answer);

		this.respondPromise(result, res, next);
	;}

	public UpdateAnswer = (req: AuthRequest, res: Response, next: NextFunction) => {
		let answer : AnswerDto = req.body;
		let user : User = req.user;
		let result = this.service.updateAnswer(user, answer);

		this.respondPromise(result, res, next);
	}

	public UpVoteAnswer = (req: AuthRequest, res: Response, next: NextFunction) => {
		let answer : AnswerDto = req.body;
		let user : User = req.user;
		let result = this.service.upVoteAnswer(user, answer._id);

		this.respondPromise(result, res, next);
	}

	public DownVoteAnswer = (req: AuthRequest, res: Response, next: NextFunction) => {
		let answer : AnswerDto = req.body;
		let user : User = req.user;
		let result = this.service.downVoteAnswer(user, answer._id);

		this.respondPromise(result, res, next);
	}
}