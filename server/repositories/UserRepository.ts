import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {IUser, User, UserModel} from "../models/User";
import {Question} from "../models/Question";
import {IUserPreferences, UserPreferences, UserPreferencesModel} from "../models/UserPerferences";
import {AppError} from "../errors/AppError";
import {isNullOrUndefined} from "util";
import {CategoryTypeEnum} from "../enums/CategoryTypeEnum";

export interface IUserRepository extends IBaseRepository<User> {
    getByEmail(email: string): Promise<User>;
    getUserPreference(user: User): Promise<UserPreferences>;
    updateQuestionVector(user: User, question: Question): Promise<any>;
}

export class UserRepository extends BaseRepository<User, IUser> implements IUserRepository {

    constructor() {
        super(UserModel)
    }

    getByEmail(email: string): Promise<User> {
        return UserModel.findOne({email: email}).lean().exec()
            .then((user: User) => this.applyAdditionalFunction(user));
    }

    getUserPreference(user: User): Promise<UserPreferences> {
        return UserPreferencesModel.findOne({user: user._id}).lean().exec()
            .then((p: UserPreferences) => {
                if (!p) {
                    p = new UserPreferences();
                    p.user = user._id;
                    return UserPreferencesModel.create(p).then((created) => <UserPreferences> created.toObject());
                }
                return p;
            });
    }

    updateQuestionVector(user: User, question: Question) {
        return UserPreferencesModel.findOne({user: user._id}).lean().exec()
            .then((p: IUserPreferences) => {
                p.question_pref = p.question_pref? p.question_pref: {tags_vec: {}, cat_vec: {}};
                let prevValues = p.question_pref.tags_vec;
                for (let tag of question.tags) {
                    let value = prevValues[tag.tag];
                    if (isNullOrUndefined(value)) {
                        prevValues[tag.tag] = this.getAdditionAmount(value);
                    } else {
                        prevValues[tag.tag] = value + this.getAdditionAmount(value);
                    }
                }

                let length = 0;
                for (let key in prevValues) {
                    length += Math.abs(prevValues[key]);
                }
                for (let key in prevValues) {
                    prevValues[key] /= length;
                }
                p.question_pref.tags_vec = prevValues;

                // update the map if the category is not NOT_SPECIFIED
                if (question.category !== CategoryTypeEnum.NOT_SPECIFIED) {
                    let cat = p.question_pref.cat_vec[question.category];
                    p.question_pref.cat_vec[question.category] = !isNullOrUndefined(cat) ?
                        cat + this.getAdditionAmount(cat) : this.getAdditionAmount(cat);
                }
                return UserPreferencesModel.findByIdAndUpdate(p._id, p);
            });

    }

    private getAdditionAmount(prev: number): number {
        // temp function to calculate the addition amount
        // 1/((x+2)^2) - 1/9 = additional amount
        if (prev < 0 || prev > 1) {
            throw new AppError("The inputted value is not in range [0,1]. value: " + prev);
        }
        if (isNullOrUndefined(prev))
            prev = 0;

        return (1 / Math.pow((prev + 2), 2)) - (1 / 9);
    }

    protected applyRestriction(user: User): User {
        delete user.local;
        delete user.facebook;
        return user;
    }

}