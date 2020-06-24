const express = require('express');
const routes = express.Router();
const multer = require('../app/middlewares/multer');

const ChefController = require('../app/controllers/ChefController');

const { onlyUsers } = require('../app/middlewares/session');

const Validator = require('../app/validators/chef');

routes.get('/', ChefController.index);
routes.get('/create', ChefController.create);
routes.get('/:id', ChefController.show);
routes.get('/:id/edit', ChefController.edit);

routes.post('/', onlyUsers, multer.single('avatar'), Validator.post, ChefController.post);
routes.put('/', onlyUsers, Validator.put, ChefController.put);
routes.delete('/', onlyUsers, ChefController.delete);

module.exports = routes;
