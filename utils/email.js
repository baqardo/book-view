const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `BookView <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, message) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: message,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.send(
      'Your password reset token (valid for only 10 minutes)',
      `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${this.url}.\nIf you didn't forget your password, please ignore this email!`
    );
  }

  async sendEmailVerification() {
    await this.send(
      'Your email verification token',
      `Please verify your email. Submit a PATCH request to: ${this.url}.\nIf you didn't create account on our website, please ignore this email!`
    );
  }
};
