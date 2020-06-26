
const faker = require('faker');
const { hash } = require('bcrypt');

const Chef = require('./src/app/models/Chef');

const File = require('./src/app/models/File');
const Recipe = require('./src/app/models/Recipe');
const RecipeFiles = require('./src/app/models/RecipeFiles');
const User = require('./src/app/models/User');

let totalChefs = 20;

async function createChefs() {
  const chefs = [];

  let files =  [];
  
  while (files.length < totalChefs) {
    files.push({
      name: faker.image.image(),
      path: `public/images/avatar.png`,
    });
  }

  const filesPromise = files.map(file => File.create(file));

  const avatarIds = await Promise.all(filesPromise);
 
  while (chefs.length < totalChefs) {
    chefs.push({
      name: faker.name.findName(),
      file_id: avatarIds[Math.floor(Math.random() * totalChefs)],
    });
  }

  const chefsPromise = chefs.map(chef => Chef.create(chef));

  chefsIds = await Promise.all(chefsPromise);
};

let usersIds = [];
let totalUsers = 3;

async function createUsers() {
  const users = [];
  const password = await hash('1111', 8);
 
  while (users.length < totalUsers) {
    users.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      is_admin: users.length == 1 ? true : false,
    });
  }

  const usersPromise = users.map(user => User.create(user));

  usersIds = await Promise.all(usersPromise);
};

let recipeIds = [];
let totalRecipes = 10;

async function createRecipes() {
  let recipes = [];

  while (recipes.length < totalRecipes) {
    let ingredients = [];
    let preparation = [];

    for (let i = 0; i < 5; i++) {
      ingredients.push(faker.lorem.paragraph(Math.ceil(Math.random() * 3)));
    }

    for (let i = 0; i < 4; i++) {
      preparation.push(faker.lorem.paragraph(Math.ceil(Math.random() * 5)));
    }

    recipes.push({
      chef_id: Math.ceil(Math.random() * totalChefs),
      user_id: usersIds[Math.floor(Math.random() * totalUsers)],
      title: faker.name.title(),
      ingredients,
      preparation,
      information: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
    });
  }

  const recipesPromise = recipes.map(recipe => Recipe.create(recipe));

  recipeIds = await Promise.all(recipesPromise);

  let files =  [];
  
  while (files.length < 50) {
    files.push({
      name: faker.image.image(),
      path: `public/images/placeholder.png`,
    });
  }

  const filesPromise = files.map(file => File.create(file));

  const recipeFileIds = await Promise.all(filesPromise);

  let recipeFiles =  [];

  while (recipeFiles.length < 50) {
    recipeFiles.push({
      recipe_id: recipeIds[Math.floor(Math.random() * 10)],
      file_id: recipeFileIds[Math.floor(Math.random() * totalRecipes)],
    });
  }

  const recipeFilesPromise = recipeFiles.map(recipeFile => RecipeFiles.create(recipeFile));

  await Promise.all(recipeFilesPromise);
}

async function init() {
  await createChefs();
  await createUsers();
  await createRecipes();
}

init();
