const fs = require('fs');
const data = require('../../../data.json');

exports.index = function (req, res) {
  return res.render('recipes/index', { recipes: data.recipes });
};

exports.show = function (req, res) {
  const { index } = req.params;
  const recipe = data.recipes[index];

  if (!recipe) return res.render('not-found');

  recipe.information = recipe.information.split('\n').join('<br />');

  return res.render('recipes/show', { recipe });
};
