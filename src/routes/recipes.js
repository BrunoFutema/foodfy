const express = require('express');
const routes = express.Router();
// multer

const RecipeController = require('../app/controllers/RecipeController');

const { onlyUsers } = require('../app/middlewares/session');

const Validator = require('../app/validators/recipe');

routes.get('/', RecipeController.index);
routes.get('/create', RecipeController.create);
routes.get('/:id', RecipeController.show);
routes.get('/:id/edit', RecipeController.edit);

routes.post('/', onlyUsers, Validator.post, RecipeController.post);
routes.put('/', onlyUsers, Validator.put, RecipeController.put);
routes.delete('/', onlyUsers, RecipeController.delete);

module.exports = routes;
