const User = require('../models/User');
const { compare } = require('bcrypt');

function checkAllFields(body) {
  const keys = Object.keys(body);

  for (key of keys) {
    if (body[key] == '') {
      return {
        user: body,
        error: 'Por favor, preencha todos os campos!'
      };
    }
  }
}

async function post(req, res, next) {
  const fillAllFields = checkAllFields(req.body);

  if (fillAllFields) {
    return res.render('admin/users/register', fillAllFields);
  }

  let { email, password, passwordRepeat } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (user) return res.render('admin/users/register', {
    user: req.body,
    error: 'Usuário já cadastrado.',
  });

  if (password != passwordRepeat) return res.render('admin/users/register', {
    user: req.body,
    error: 'A senha e a repetição da senha estão incorretos!'
  });

  next();
}

async function show(req, res, next) {
  const { userId: id } = req.session;

  const user = await User.findOne({ where: { id } });

  if (!user) return res.render('admin/users/register', {
    error: 'Usuário não encontrado!',
  });

  req.user = user;

  next();
}

async function put(req, res, next) {
  const fillAllFields = checkAllFields(req.body);

  if (fillAllFields) {
    return res.render('admin/users/index', fillAllFields);
  }

  const { id, password } = req.body;

  const user = await User.findOne({ where: { id } });

  if (req.session.userId == user.id) {
    if (!password) {
      return res.render('admin/users/index', {
        user: req.body,
        error: 'Coloque sua senha para atualizar seu cadastro.',
      });
    }
  
    const passed = await compare(password, user.password);
  
    if (!passed) return res.render('admin/users/index', {
      user: req.body,
      error: 'Senha incorreta.',
    });

    req.user = user;
  }

  next();
}

module.exports = {
  post,
  show,
  put,
};
