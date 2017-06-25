
import {AnswerRepository} from "./repositories/AnswerRepository";
import {QuestionRepository} from "./repositories/QuestionRepository";
import {UserRepository} from "./repositories/UserRepository";
import {AuthenticationService} from "./services/AuthenticationService";
import {QuestionService} from "./services/QuestionService";
import {EmailVerificationRepository} from "./repositories/EmailVerificationRepository";
import {IMailService, MailService} from "./services/MailService";

export class RepositoryProvider {
    static AnswerRepository = new AnswerRepository();
    static QuestionRepository = new QuestionRepository();
    static UserRepository = new UserRepository();
    static EmailVerificationRepository = new EmailVerificationRepository();

}

export class ServiceProvider {

    static MailService: IMailService = new MailService();
    static AuthenticationService = new AuthenticationService(ServiceProvider.MailService, RepositoryProvider.UserRepository, RepositoryProvider.EmailVerificationRepository);
    static QuestionService = new QuestionService(RepositoryProvider.QuestionRepository, RepositoryProvider.AnswerRepository);

}