import { Container } from "inversify";
import "reflect-metadata"

import {IQuestionRepository, QuestionRepository} from "./repositories/QuestionRepository";
import {IQuestionAnswerService, QuestionAnswerService} from "./services/QuestionAnswerService";
import TYPES from "./enums/ClassTypes";
import {IAnswerRepository, AnswerRepository} from './repositories/AnswerRepository';
import {IUserRepository, UserRepository} from "./repositories/UserRepository";

let container = new Container();

/* Repositories */
container.bind<IUserRepository>(TYPES.IUserRepo).to(UserRepository);
container.bind<IQuestionRepository>(TYPES.IQuestionRepo).to(QuestionRepository);
container.bind<IAnswerRepository>(TYPES.IAnswerRepo).to(AnswerRepository);

/* Services */
container.bind<IQuestionAnswerService>(TYPES.IQAService).to(QuestionAnswerService);

export default container;