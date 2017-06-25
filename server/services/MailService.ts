import {BaseService} from "./BaseService";
import {SendMailOptions, SentMessageInfo} from "nodemailer";
import {config} from "../config";

let nodemailer = require('nodemailer');

export interface IMailService {
    sendMail(options: SendMailOptions): Promise<SentMessageInfo>
}

export class MailService extends BaseService implements IMailService {

    sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
        return this.transporter.sendMail(options);
    }

    // create reusable transporter object using the default SMTP transport
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email.address,
            pass: config.email.password
        }
    });

}
