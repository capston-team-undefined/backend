import { MailerOptions, MailerOptionsFactory } from "@nestjs-modules/mailer";

export class MailConfig implements MailerOptionsFactory {
    createMailerOptions(): MailerOptions | Promise<MailerOptions> {
        return {
            transport: {
                host: process.env.MAIL_HOST,
                port: 587,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD,
                },
                secure: false // use TLS
            },
            defaults: {
                from: '"nest-modules" <modules@nestjs.com>',
            },
        };
    }
}
