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
import {UniversityRepository} from "./repositories/UniversityRepository";
import {LocationService} from "./services/LocationService";
import {UserService} from "./services/UserService";
import {TeammateRecordService} from "./services/TeammateRecordService";
import {TeammateRecordRepository} from "./repositories/TeammateRecordRepository";
import {StoryRepository} from "./repositories/StoryRepository";
import {StoryService} from "./services/StoryService";
import {INotificationRepository, NotificationRepository} from "./repositories/NotificationRepository";
import {ISubscriptionRepository, SubscriptionRepository} from "./repositories/SubcriptionRepository";
import {INotificationService, NotificationService} from "./services/NotificationService";
import {ISubscriptionService, SubscriptionService} from "./services/SubscriptionService";
import {DashboardViewRepository} from "./repositories/DashboardViewRepository";
import {AdminService} from "./services/AdminService";
import {DashboardService} from "./services/DashboardService";
import {SubscriptionConversions} from "./conversions/SubscriptionConversions";
import {IRecruitmentRepository, RecruitmentRepository} from "./repositories/RecruitmentRepository";
import {RecruitmentService} from "./services/RecruitmentService";
import {IRecruitmentRecordsRepository, RecruitmentRecordsRepository} from "./repositories/RecruitmentRecordsRepository";
import {RecruitmentRecordsService} from "./services/RecruitmentRecordsService";

export class RepositoryProvider {
    static AnswerRepository = new AnswerRepository();
    static QuestionRepository = new QuestionRepository();
    static UserRepository = new UserRepository();
    static EmailVerificationRepository = new EmailVerificationRepository();
    static TagRepository = new TagRepository();
    static FileUploadRecordRepository = new FileUploadRecordRepository();
    static UniversityRepository = new UniversityRepository();
    static TeammateRecordRepository = new TeammateRecordRepository();
    static StoryRepository = new StoryRepository();
    static DashboardViewRepository = new DashboardViewRepository();
    static NotificationRepository: INotificationRepository= new NotificationRepository();
    static SubscriptionRepository: ISubscriptionRepository = new SubscriptionRepository();
    static RecruitmentRepository: IRecruitmentRepository = new RecruitmentRepository();
    static RecruitmentRecordsRepository: IRecruitmentRecordsRepository = new RecruitmentRecordsRepository();
}

export class ConversionsProvider {
    static SubscriptionConversions: SubscriptionConversions = new SubscriptionConversions()
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
        RepositoryProvider.TagRepository,
        RepositoryProvider.UserRepository);
    static AnswerService = new AnswerService(
        RepositoryProvider.AnswerRepository,
        RepositoryProvider.QuestionRepository
    );
    static FileSystemService = new FileSystemService(
        RepositoryProvider.FileUploadRecordRepository
    );
    static LocationService = new LocationService(RepositoryProvider.UniversityRepository);
    static UserService = new UserService(
        RepositoryProvider.UserRepository,
        RepositoryProvider.StoryRepository,
        RepositoryProvider.QuestionRepository
    );
    static TeammateRecordService = new TeammateRecordService(RepositoryProvider.TeammateRecordRepository);
    static StoryService = new StoryService(
        RepositoryProvider.StoryRepository,
        RepositoryProvider.TagRepository,
        RepositoryProvider.UserRepository
    );
    static NotificationService: INotificationService = new NotificationService(
        RepositoryProvider.NotificationRepository
    );
    static SubscriptionService: ISubscriptionService = new SubscriptionService(
        RepositoryProvider.SubscriptionRepository,
        ServiceProvider.NotificationService
    );
    static AdminService = new AdminService(RepositoryProvider.DashboardViewRepository);
    static DashboardService = new DashboardService(
        RepositoryProvider.QuestionRepository,
        RepositoryProvider.StoryRepository
    );
    static RecruitmentService = new RecruitmentService(
        RepositoryProvider.RecruitmentRepository
    );
    static RecruitmentRecordsService = new RecruitmentRecordsService(
        RepositoryProvider.RecruitmentRecordsRepository,
        RepositoryProvider.RecruitmentRepository,
        RepositoryProvider.UserRepository
    )
}