const express = require('express');
const routes = express.Router();
const multer = require('../app/middlewares/multer');

const RecipeController = require('../app/controllers/RecipeController');

const { onlyUsers } = require('../app/middlewares/session');

const Validator = require('../app/validators/recipe');

routes.get('/', RecipeController.index);
routes.get('/create', onlyUsers, RecipeController.create);
routes.get('/:id', RecipeController.show);
routes.get('/:id/edit', onlyUsers, RecipeController.edit);

routes.post('/', onlyUsers, multer.array('photos', 5), Validator.post, RecipeController.post);
routes.put('/', onlyUsers, multer.array('photos', 5), Validator.put, RecipeController.put);
routes.delete('/', onlyUsers, RecipeController.delete);

module.exports = routes;
