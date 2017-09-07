
import {UserDto} from "../dtos/auth/UserDto";
import {IUserRepository} from "../repositories/UserRepository";
import {User} from "../models/User";
import {generateToken} from "../utils/JsonWebTokenUtil";
import {removeUserRestrictedInfo} from "../utils/UserUtils";
import {ProfileDto} from "../dtos/profile/ProfileDto";
import {IStoryRepository} from "../repositories/StoryRepository";
import {IQuestionRepository} from "../repositories/QuestionRepository";
import {Story} from "../models/Story";
import {Question} from "../models/Question";
import {PublicityStatus} from "../enums/PublicityStatus";

export interface IUserService {
    updateUser(user: UserDto, currentUser: User): Promise<{token: string}>;
    getUserProfile(username: string): Promise<any>;
}

export class UserService implements IUserService{
    constructor(
        private userRepository: IUserRepository,
        private storyRepository: IStoryRepository,
        private questionRepository: IQuestionRepository
    ) {}

    updateUser(user: UserDto, currentUser: User): Promise<{token: string}> {
        currentUser.country = user.country;
        currentUser.university = user.university;
        currentUser.company = user.company;
        return this.userRepository.update(currentUser).then((user: User) => {
            return this.userRepository.getById(user._id).then((user : User) => {
                return {token: generateToken(user)};
            });
        });
    }

     async getUserProfile(username: string): Promise<ProfileDto> {
        let dto: ProfileDto = {
            username: undefined,
            questions: [],
            stories: [],
            points: 0,
            university: undefined,
            country: undefined,
            createdAt: undefined,
        };
        let user: User = await this.userRepository.findOne({username: username});

         // remove extra information from user
         dto.username = user.username;
         dto.university = user.university;
         dto.country = user.country;
         dto.points = user.points;
         dto.createdAt = user.createdAt;
         // right now fetch everything
         let stories: Story[] = await this.storyRepository.getStoriesByAuthor(user, PublicityStatus.PUBLIC);

         dto.stories = stories;

         let questions: Question[] = await this.questionRepository.getQuestionsByAuthor(user);
         dto.questions = questions.map(q=> Question.fromObject(q).toPreviewDto());
         return dto;
    }
}