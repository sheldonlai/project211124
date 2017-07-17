
import {AnswerRepository} from "./repositories/AnswerRepository";
import {QuestionRepository} from "./repositories/QuestionRepository";
import {UserRepository} from "./repositories/UserRepository";
import {AuthenticationService} from "./services/AuthenticationService";
import {QuestionService} from "./services/QuestionService";
import {EmailVerificationRepository} from "./repositories/EmailVerificationRepository";
import {IMailService, MailService} from "./services/MailService";
import {TemplatesProvider} from "./services/TemplatesProvider";
import {TagRepository} from "./repositories/TagRepository";
import {AnswerService} from "./services/AnswerService";
import {FileSystemService} from "./services/FileSystemService";
import {FileUploadRecordRepository} from "./repositories/FileUploadRecordRepository";

export class RepositoryProvider {
    static AnswerRepository = new AnswerRepository();
    static QuestionRepository = new QuestionRepository();
    static UserRepository = new UserRepository();
    static EmailVerificationRepository = new EmailVerificationRepository();
    static TagRepository = new TagRepository();
    static FileUploadRecordRepository = new FileUploadRecordRepository();
}

export class ServiceProvider {

    static TemplatesProvider: TemplatesProvider = new TemplatesProvider();
    static MailService: IMailService = new MailService();
    static AuthenticationService = new AuthenticationService(
        ServiceProvider.MailService,
        ServiceProvider.TemplatesProvider,
        RepositoryProvider.UserRepository,
        RepositoryProvider.EmailVerificationRepository);
    static QuestionService = new QuestionService(
        RepositoryProvider.QuestionRepository,
        RepositoryProvider.AnswerRepository,
        RepositoryProvider.TagRepository);
    static AnswerService = new AnswerService(
        RepositoryProvider.AnswerRepository
    );
    static FileSystemService = new FileSystemService(
        RepositoryProvider.FileUploadRecordRepository
    );

}