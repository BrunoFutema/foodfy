const express = require('express');
const routes = express.Router();
const data = require('../../data.json');

const HomeController = require('../app/controllers/HomeController');
const RecipeController = require('../app/controllers/RecipeController');
const ChefController = require('../app/controllers/ChefController');

const recipes = require('./recipes');
const chefs = require('./chefs');

routes.get('/', HomeController.index);

routes.get('/about', (req, res) => {
  return res.render('about/show', { abouts: data.abouts });
});

routes.get('/recipes', RecipeController.index);
routes.get('/recipes/:id', (req, res, next) => {
  const admin = false;
  req.admin = admin;

  next();
}, RecipeController.show);
routes.get('/chefs', ChefController.index);

routes.use('/admin/recipes', recipes);
routes.use('/admin/chefs', chefs);

module.exports = routes;
