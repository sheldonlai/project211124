import {BaseService} from "./BaseService";
import {SendMailOptions, SentMessageInfo, Transporter} from "nodemailer";
import {config} from "../config";

let nodemailer = require('nodemailer');

export interface IMailService {
    sendMail(options: SendMailOptions, transporter?: Transporter): Promise<SentMessageInfo>
}

export class MailService extends BaseService implements IMailService {

    sendMail(options: SendMailOptions, transporter?: Transporter): Promise<SentMessageInfo> {
        transporter = (transporter)? transporter : MailTransporters.Default;
        return transporter.sendMail(options);
    }

}

export class MailTransporters {

    public static Gmail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email.address,
            pass: config.email.password
        }
    });

    public static Default = MailTransporters.Gmail;

}
