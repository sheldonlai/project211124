import { Container } from "inversify";
import "reflect-metadata"

import {IQuestionRepository, QuestionRepository} from "./respositories/QuestionRepository";
import {IQuestionAnswerService, QuestionAnswerService} from "./services/QuestionAnswerService";
import TYPES from "./enums/ClassTypes";

let container = new Container();
container.bind<IQuestionRepository>(TYPES.IQuestionRepo).to(QuestionRepository);
container.bind<IQuestionAnswerService>(TYPES.IQAService).to(QuestionAnswerService);
export default container;