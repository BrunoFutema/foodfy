const User = require('../models/User');

const { hash } = require('bcrypt');
const crypto = require('crypto');
const mailer = require('../../lib/mailer');

module.exports = {
  loginForm(req, res) {
    return res.render('session/login');
  },
  login(req, res) {
    req.session.userId = req.user.id;
    req.session.user = req.user;

    return res.redirect('/');
  },
  logout(req, res) {
    req.session.destroy();
    return res.redirect('/');
  },
  forgotForm(req, res) {
    return res.render('session/forgot-password');
  },
  async forgot(req, res) {
    const user = req.user;

    try {
      const token = crypto.randomBytes(20).toString('hex');

      let now = new Date();
      now = now.setHours(now.getHours() + 1);

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });

      await mailer.sendMail({
        to: user.email,
        from: 'no-reply@foodfy.com.br',
        subject: 'Recuperação de senha',
        html: `<h2>Perdeu a chave?</h2>
          <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
          <p>
            <a href="http://localhost:3000/session/reset-password?token=${token}" target="_blank">
              RECUPERAR SENHA
            </a>
          </p>
        `,
      });

      return res.render('session/forgot-password', {
        success: 'Verifique seu email para resetar sua senha!'
      });

    } catch (err) {
      console.error(err);
      return res.render('session/forgot-password', {
        error: 'Erro inesperado, tente novamente!'
      });
    }
  },
  resetForm(req, res) {
    return res.render('session/reset-password', { token: req.query.token });
  },
  async reset(req, res) {
    const { user }  = req;
    const { password, token } = req.body;

    console.log(req.query);

    try {
      const newPassword = await hash(password, 8);

      await User.update(user.id, {
        password: newPassword,
        reset_token: '',
        reset_token_expires: '',
      });

      return res.render('session/login', {
        user: req.body,
        success: 'Senha atualizada! Faça o seu login.'
      });

    } catch (err) {
      console.error(err);
      return res.render('session/reset-password', {
        user: req.body,
        token,
        error: 'Erro inesperado, tente novamente!'
      });
    }
  }
};
