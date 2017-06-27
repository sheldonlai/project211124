import {SendMailOptions} from "nodemailer";
import {AppError} from "../../errors/AppError";
import {ServerError} from "../../errors/HttpStatus";

export class MailOptionsBuilder {
    private _from: string;
    private _to: string|string[];
    private _subject: string;
    private _html: string;

    constructor() {}

    setSenderName(name: string): MailOptionsBuilder {
        this._from = name;
        return this
    }

    setReceiver(address: string|string[]): MailOptionsBuilder {
        this._to = address;
        return this
    }

    setSubject(subject: string): MailOptionsBuilder {
        this._subject = subject;
        return this
    }

    setHTML(html: string): MailOptionsBuilder {
        this._html = html;
        return this;
    }

    build(): SendMailOptions {
        if (!this._from) {
            this._from = "AskaLot Inc."; // TODO: get from config or messages
        }
        if (!this._to) {
            throw new AppError("Must provide at least 1 receiver address.", ServerError.INTERNAL_SERVER_ERROR);
        }
        if (!this._subject) {
            throw new AppError("Mail subject cannot be empty.", ServerError.INTERNAL_SERVER_ERROR)
        }
        if (!this._html) {
            throw new AppError("Content cannot be empty", ServerError.INTERNAL_SERVER_ERROR)
        }
        let options = {
            from: this._from,
            to: this._to,
            subject: this._subject,
            html: this._html
        };
        return <SendMailOptions>options;
    }

}
