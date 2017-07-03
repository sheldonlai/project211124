let mustache = require('mustache');
let fs = require('fs');
let path = require('path');

export class TemplatesProvider {

    private readonly _emailVerificationTemplate: string = 'emailVerificationTemplate.html';

    private readTemplate(fileName: string): string {
        let filePath = path.join(__dirname, '..', '..', 'static', 'templates', fileName);
        return fs.readFileSync(filePath).toString();
    }

    emailVerification(recipientName: string, verificationLink: string): string {
        let view: Object = {
            name: recipientName,
            link: verificationLink
        };
        return mustache.render(
            this.readTemplate(this._emailVerificationTemplate),
            view
        );
    }

}
