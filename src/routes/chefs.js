const express = require('express');
const routes = express.Router();
const multer = require('../app/middlewares/multer');

const ChefController = require('../app/controllers/ChefController');

const { onlyUsers, onlyAdmin } = require('../app/middlewares/session');

const Validator = require('../app/validators/chef');

routes.get('/', ChefController.index);
routes.get('/create', onlyUsers, onlyAdmin, ChefController.create);
routes.get('/:id', onlyUsers, ChefController.show);
routes.get('/:id/edit', onlyUsers, onlyAdmin, ChefController.edit);

routes.post('/', onlyUsers, onlyAdmin, multer.single('avatar'), Validator.post, ChefController.post);
routes.put('/', onlyUsers, onlyAdmin, multer.single('avatar'), Validator.put, ChefController.put);
routes.delete('/', onlyUsers, onlyAdmin, ChefController.delete);

module.exports = routes;
