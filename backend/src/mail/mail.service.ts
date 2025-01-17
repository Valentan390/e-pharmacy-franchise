import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  private transporter: Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST', 'smtp.ukr.net');
    const port = this.configService.get<number>('SMTP_PORT', 465);
    const secure = this.configService.get<boolean>('SMTP_SECURE', true);
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASSWORD');

    this.transporter = createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }
  async sendMail(options: SendMailOptions): Promise<void> {
    const from = this.configService.get<string>(
      'SMTP_FROM',
      'no-reply@example.com',
    );
    await this.transporter.sendMail({ ...options, from });
  }
}
