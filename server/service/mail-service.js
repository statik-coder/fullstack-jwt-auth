const mailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = mailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Account activation on ${process.env.API_URL}`,
      html: `
        <div>
          <h1>Please, activate your account!</h1>
          <p>Click <a href="${link}">here</a>!</p>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
