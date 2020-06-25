const { hash } = require('bcrypt');
const User = require('../models/User');
const crypto = require('crypto');
const mailer = require('../../lib/mailer');

module.exports = {
  registerForm(req, res) {
    return res.render('admin/users/register');
  },
  async list(req, res) {
    const users = await User.findAll();

    return res.render('admin/users/index', { users });
  },
  async post(req, res) {
    try {
      let { name, email, is_admin = false } = req.body;

      const password = crypto.randomBytes(20).toString('hex');
      const passwordHash = await hash(password, 8);

      const userId = await User.create({
        name,
        email,
        password: passwordHash,
        is_admin,
      });

      await mailer.sendMail({
        to: email,
        from: 'no-reply@foodfy.com.br',
        subject: 'Foodfy - Seu acesso ao sistema',
        html: `<h2>Segue abaixo duas credenciais de acesso.</h2>
          <p>Email: ${email}</p>
          <p>Senha: ${password}</p>
          <br>
          <p>Para acessar, clique no link abaixo</p>
          <p>
            <a href="http://localhost:5000/session/login" target="_blank">
              ACESSAR
            </a>
          </p>
        `,
      });
  
      return res.redirect(`/admin/users/${userId}/edit`);
    } catch (err) {
      console.error(err);
    }
  },
  async edit(req, res) {
    try {
      const { id } = req.params;

      const user = await User.find(id);

      return res.render('admin/users/edit', { user });
    } catch (err) {
      console.error(err);
    }
  },
  async put(req, res) {
    try {
      const { user } = req.session;
      
      let { id, name, email, is_admin } = req.body;

      if (user.is_admin) {
        await User.update(id, {
          is_admin: is_admin ? true : false,
        });
      } else {
        await User.update(id, {
          name,
          email,
        });
      }

      const users = await User.findAll();

      return res.render('admin/users/index', {
        users,
        success: `A conta do usuário ${name} foi atualizada com sucesso!`,
      });

    } catch (err) {
      console.error(err);
      return res.render('admin/users/index', {
        error: 'Algum erro aconteceu!',
      });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.body;

      if (req.session.userId == id) {
        return res.render('admin/users/edit', {
          user: req.session.user,
          error: 'Não é permitido deletar a sua própria conta!',
        });
      }

      await User.delete(id);

      const users = await User.findAll();

      return res.render('admin/users/index', {
        users,
        success: 'Usuário deletado com sucesso!',
      });
    } catch (err) {
      console.error(err);
      return res.render('admin/users/index', {
        user: req.body,
        error: 'Erro ao tentar deletar sua conta!'
      });
    }
  },
};