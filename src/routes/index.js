const express = require('express');
const routes = express.Router();
const data = require('../../data.json');

const HomeController = require('../app/controllers/HomeController');
const RecipeController = require('../app/controllers/RecipeController');
const ChefController = require('../app/controllers/ChefController');
const SearchController = require('../app/controllers/SearchController');

const recipes = require('./recipes');
const chefs = require('./chefs');

routes.get('/', HomeController.index);

function isAdmin(req, res, next) {
  req.admin = false;

  next();
};

routes.get('/about', (req, res) => {
  return res.render('about/show', { abouts: data.abouts });
});

routes.get('/recipes', isAdmin, RecipeController.index);
routes.get('/recipes/search', isAdmin, SearchController.index);
routes.get('/recipes/:id', isAdmin, RecipeController.show);
routes.get('/chefs', isAdmin, ChefController.index);

routes.use('/admin/recipes', isAdmin, recipes);
routes.use('/admin/chefs', isAdmin, chefs);

module.exports = routes;
