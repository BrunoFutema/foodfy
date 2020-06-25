const User = require('../models/User');

module.exports = {
  async index(req, res) {
    try {
      const user = await User.find(req.session.userId);

      return res.render('admin/users/profile', { user });
    } catch (err) {
      console.error(err);
    }
  },
  async put(req, res) {
    try {
      const { user } = req.session;
      
      let { name, email, password } = req.body;

      if (!password) return res.render('admin/users/profile', {
        user: req.body,
        error: 'Para salvar por favor insira sua senha!',
      });

      await User.update(user.id, {
        name,
        email,
      });

      return res.render('admin/users/profile', {
        user: req.body,
        success: 'Conta atualizada com sucesso!',
      });

    } catch (err) {
      console.error(err);
      return res.render('admin/users/profile', {
        error: 'Algum erro aconteceu!',
      });
    }
  },
};
