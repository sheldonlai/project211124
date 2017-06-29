import {BaseRepository, IBaseRepository} from "./BaseRepository";
import {EmailVerification, EmailVerificationModel, IEmailVerification} from "../models/EmailVerification";

export interface IEmailVerificationRepository extends IBaseRepository<EmailVerification> {
    findByCode(code: string): Promise<EmailVerification>
    findByUser(user: string): Promise<EmailVerification>
}

export class EmailVerificationRepository
    extends BaseRepository<EmailVerification, IEmailVerification>
    implements IEmailVerificationRepository {

    constructor() {
        super(EmailVerificationModel)
    }

    findByCode(code: string): Promise<EmailVerification> {
        return EmailVerificationModel.findOne({code: code}).lean().exec()
            .then((emailVerification: EmailVerification)=> emailVerification);
    }

    findByUser(user: string): Promise<EmailVerification> {
        return EmailVerificationModel.findOne({user: user}).lean().exec()
            .then((emailVerification: EmailVerification)=> emailVerification);
    }

}