const express = require('express');
const routes = express.Router();
const data = require('../data.json');

const about = require('./app/controllers/about');
const recipes = require('./app/controllers/recipes');
const admin = require('./app/controllers/admin');

routes.get('/', function (req, res) {
  const bestSellers = data.recipes.slice(0, 6);
  return res.render('index', { recipes: bestSellers });
});

routes.get('/about', about.show);

routes.get('/recipes', recipes.index);
routes.get('/recipes/:index', recipes.show);

routes.get('/admin/recipes', admin.index);
routes.get('/admin/recipes/create', admin.create);
routes.get('/admin/recipes/:index', admin.show);
routes.get('/admin/recipes/:index/edit', admin.edit);

routes.post('/admin/recipes', admin.post);
routes.put('/admin/recipes', admin.put);
routes.delete('/admin/recipes', admin.delete);

module.exports = routes;
