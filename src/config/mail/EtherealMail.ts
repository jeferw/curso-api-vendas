import nodemailer from 'nodemailer';
import mailConfig from '@config/mail/mail';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IMailContact {
    name: string;
    email: string;
}

interface ITemplateVariables {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariables;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class EtherealMail {
    static async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();

        const mailTemplate = new HandlebarsMailTemplate();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        const { email, name } = mailConfig.defaults.from;

        const message = await transporter.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await mailTemplate.parse(templateData),
        });

        console.log(`Mensagem enviada: ${message.messageId}`);
        console.log(`URL: ${nodemailer.getTestMessageUrl(message)}`);
    }
}
