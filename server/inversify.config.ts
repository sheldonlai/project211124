import { Container } from "inversify";
import "reflect-metadata"

import {IQuestionRepository, QuestionRepository} from "./respositories/QuestionRepository";
import {IQuestionAnswerService, QuestionAnswerService} from "./services/QuestionAnswerService";
import TYPES from "./enums/ClassTypes";
import {IAnswerRepository, AnswerRepository} from './respositories/AnswerRepository';

let container = new Container();
container.bind<IQuestionRepository>(TYPES.IQuestionRepo).to(QuestionRepository);
container.bind<IAnswerRepository>(TYPES.IAnswerRepo).to(AnswerRepository);
container.bind<IQuestionAnswerService>(TYPES.IQAService).to(QuestionAnswerService);
export default container;