const express = require('express');
const routes = express.Router();
const data = require('../../data.json');

const HomeController = require('../app/controllers/HomeController');
const RecipeController = require('../app/controllers/RecipeController');
const ChefController = require('../app/controllers/ChefController');
const SearchController = require('../app/controllers/SearchController');

const session = require('./session');
const users = require('./users');
const profile = require('./profile');
const recipes = require('./recipes');
const chefs = require('./chefs');

routes.get('/', HomeController.index);

routes.get('/about', (req, res) => {
  return res.render('about/show', { abouts: data.abouts });
});

routes.get('/recipes', RecipeController.index);
routes.get('/recipes/search', SearchController.index);
routes.get('/recipes/:id', RecipeController.show);
routes.get('/chefs', ChefController.index);

routes.use('/session', session);
routes.use('/admin/users', users);
routes.use('/admin/profile', profile);
routes.use('/admin/recipes', recipes);
routes.use('/admin/chefs', chefs);

routes.get('/accounts', function (req, res) { return res.redirect('/session/login'); });

module.exports = routes;
