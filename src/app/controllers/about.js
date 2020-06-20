const data = require('../../../data.json');

exports.show = function (req, res) {
  return res.render('abouts/show', { abouts: data.abouts });
};
