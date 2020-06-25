const express = require('express');
const routes = express.Router();

const ProfileController = require('../app/controllers/ProfileController');

const { onlyUsers } = require('../app/middlewares/session');

routes.get('/', onlyUsers, ProfileController.index);
routes.put('/', onlyUsers, ProfileController.put);

module.exports =routes;
