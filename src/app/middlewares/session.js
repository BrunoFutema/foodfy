function onlyUsers(req, res, next) {
  if (!req.session.userId) return res.redirect('/session/login');

  next();
};

function onlyAdmin(req, res, next) {
  if (!req.session.user.is_admin) return res.redirect('/');

  next();
};

function isLoggedRedirectToProfile(req, res, next) {
  if (req.session.userId) return res.redirect('/admin/profile');

  next();
};

module.exports = {
  onlyUsers,
  onlyAdmin,
  isLoggedRedirectToProfile,
};
