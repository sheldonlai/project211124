import {BaseService} from "./BaseService";
import {SendMailOptions, SentMessageInfo} from "nodemailer";

let nodemailer = require('nodemailer');
let config = require('../config.ts');

export interface IMailService {
    sendMail(options: SendMailOptions): Promise<SentMessageInfo>
}

export class MailService extends BaseService implements IMailService {

    sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
        console.log("sending emaillllls");
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
