const fs = require('fs');
const data = require('../../../data.json');

exports.index = function (req, res) {
  let index = 0;
  let recipes = [];

  for (let recipe of data.recipes) {
    recipes.push({
      index,
      ...recipe,
    });
    index++;
  }

  return res.render('admin/index', { recipes });
};

exports.create = function (req, res) {
  return res.render('admin/create');
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '') return res.send('Please, fill all fields!');
  }

  let { image, title, author, ingredients, preparations, information } = req.body;

  data.recipes.push({
    image,
    title,
    author,
    ingredients,
    preparations,
    information,
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write file error!');

    return res.redirect('/admin/recipes');
  });
};

exports.show = function (req, res) {
  const { index } = req.params;
  const recipe = data.recipes[index];

  if (!recipe) return res.render('not-found');

  recipe.index = index;
  recipe.information = recipe.information.split('\n').join('<br />');

  return res.render('admin/show', { recipe });
};

exports.edit = function (req, res) {
  const { index } = req.params;
  const recipe = data.recipes[index];

  if (!recipe) return res.render('not-found');

  recipe.index = index;
  recipe.information = recipe.information.split('\n').join('<br />');

  return res.render('admin/edit', { recipe });
};

exports.put = function (req, res) {
  const { index } = req.body;

  const foundRecipe = data.recipes[index];

  if (!foundRecipe) return res.send('Recipe not found');

  const recipe = {
    ...foundRecipe,
    ...req.body,
  };

  data.recipes[index] = recipe;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write error!');
  })

  return res.redirect(`/recipes/${index}`);
};

exports.delete = function (req, res) {
  const { index } = req.body;

  data.recipes.splice(index, 1);

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write file error!');

    return res.redirect('/admin/recipes');
  });
};
