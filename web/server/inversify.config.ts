import { Container } from "inversify";
import "reflect-metadata"

import {IQuestionAnswerRepository, QuestionAnswerRepository} from "./respositories/QuestionAnswerRepository";
import {IQuestionAnswerService, QuestionAnswerService} from "./services/QuestionAnswerService";
import TYPES from "./enums/ClassTypes";

let container = new Container();
container.bind<IQuestionAnswerRepository>(TYPES.IQARepo).to(QuestionAnswerRepository);
container.bind<IQuestionAnswerService>(TYPES.IQAService).to(QuestionAnswerService);
export default container;