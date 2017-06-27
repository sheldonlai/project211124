/**
 * Created by Phillip on 2017-06-25.
 */

let es6Renderer = require('express-es6-template-engine');

export class TemplatesProvider {

    private readonly _emailVerificationTemplate: string = "server/views/emailVerificationTemplate.html";
    private readonly _callBack = (err, content) => err || content;

    emailVerification(recipientName: string, verificationLink: string): string {
        console.log(recipientName);
        console.log(verificationLink);
        let x = es6Renderer(this._emailVerificationTemplate, {locals: {name: 'Welcome!', link:"qwe"}}   );
        console.log(x);
        return "123";
    }

}
