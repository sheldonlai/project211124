import {NextFunction, Request, Response, Router} from "express";
import {IAnswerService} from "../services/QuestionService";
import {BaseAPI} from "./BaseAPI";
import {APIUrls} from "../urls";
import {AuthRequest, maybeAuthenticated, mustBeAuthenticated} from "../middlewares/AuthMiddleware";
import {QuestionDto} from "../dtos/q&a/QuestionDto";
import {AnswerDto} from "../dtos/q&a/AnswerDto";
import {User} from "../models/User";

export class AnswerAPI extends BaseAPI{
	private service : IAnswerService;

	constructor(router: Router, service: IAnswerService){
		super();
		this.service = service;
		router.post(APIUrls.CreateAnswer, mustBeAuthenticated, this.CreateAnswer);
		router.post(APIUrls.UpdateAnswer, mustBeAuthenticated, this.UpdateAnswer);
	}

	public CreateAnswer(req: AuthRequest, res: Response, next: NextFunction){
		let answer : AnswerDto = req.body;
		let user : User = req.user;
		let result = this.service.createAnswer(user, answer);

		this.respondPromise(result, res, next);
	}

	public UpdateAnswer(req: AuthRequest, res: Response, next: NextFunction){
		let answer : AnswerDto = req.body;
		let user : User = req.user;
		let result = this.service.updateAnswer(user, answer);

		this.respondPromise(result, res, next);
	}
}