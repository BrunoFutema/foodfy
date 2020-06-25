const express = require('express');
const routes = express.Router();

const UserController = require('../app/controllers/UserController');

const UserValidator = require('../app/validators/user');

const { onlyUsers } = require('../app/middlewares/session');

routes.get('/register', UserController.registerForm);
routes.get('/:id/edit', UserController.edit);

routes.get('/', onlyUsers, UserController.list);
routes.post('/', onlyUsers, UserValidator.post, UserController.post);
routes.put('/', onlyUsers, UserValidator.put, UserController.put);
routes.delete('/', onlyUsers, UserController.delete);

module.exports = routes;
