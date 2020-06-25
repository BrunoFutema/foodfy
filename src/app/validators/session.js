const User = require('../models/User');
const { compare } = require('bcrypt');

async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) return res.render('session/login', {
    user: req.body,
    error: 'Por favor informe suas credenciais.',
  });

  const user = await User.findOne({ where: { email } });

  if (!user) return res.render('session/login', {
    user: req.body,
    error: 'Usuário não cadastrado!',
  });

  const passed = await compare(password, user.password);

  if (!passed) return res.render('session/login', {
    user: req.body,
    error: 'Senha incorreta.',
  });

  req.user = user;

  next();
}

async function forgot(req, res, next) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.render('session/forgot-password', {
      user: req.body,
      error: 'Email não cadastrado!',
    });

    req.user = user;

    next();
  } catch (err) {
    console.error(err);
  }
}

async function reset(req, res, next) {
  const { email, password, passwordRepeat, token } = req.body;

  console.log(req.body);

  const user = await User.findOne({ where: { email } });

  if (!user) return res.render('session/reset-password', {
    user: req.body,
    token,
    error: 'Usuário não cadastrado!',
  });

  if (password != passwordRepeat) return res.render('session/reset-password', {
    user: req.body,
    token,
    error: 'A senha e a repetição da senha estão incorretos!'
  });

  if (token != user.reset_token) return res.render('session/reset-password', {
    user: req.body,
    token,
    error: 'Token inválido! Solicite uma nova recuperação de senha.'
  });

  let now = new Date();
  now = now.setHours(now.getHours());

  if (now > user.reset_token_expires) return res.render('session/reset-password', {
    user: req.body,
    token,
    error: 'Token expirado! Por favor, solicite uma nova recuperação de senha.'
  });

  req.user = user;

  next();
}

module.exports = {
  login,
  forgot,
  reset,
};
