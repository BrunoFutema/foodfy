const Recipe = require('../models/Recipe');

const { date } = require('../../lib/utils');

async function getImages(recipeId) {
  let files = await Recipe.files(recipeId);

  files = files.map(file => ({
    ...file,
    src: `${file.path.replace('public', '')}`
  }));

  return files;
};

async function getAuthor(recipeId) {
  let author = await Recipe.author(recipeId);

  return author;
};

async function format(recipe) {
  const files = await getImages(recipe.id);

  if (files[0]) recipe.img = files[0].src;

  if (recipe.img) recipe.img = recipe.img.replace('\\', '/').replace('\\', '/');

  recipe.files = files;

  const chef = await getAuthor(recipe.id);

  recipe.author = chef.name;

  const { day, hour, minutes, month } = date(recipe.updated_at);

  recipe.published = {
    day: `${day}/${month}`,
    hour: `${hour}h${minutes}`,
  };

  return recipe;
};

const LoadServices = {
  load(service, filter, order) {
    this.filter = filter;
    this.order = order;
    return this[service]();
  },
  async recipe() {
    try {
      const recipe = await Recipe.findOne(this.filter);
      return format(recipe);
    } catch (err) {
      console.error(err);
    }
  },
  async recipes() {
    try {
      const recipes = await Recipe.findAll(this.filter, this.order);
      const recipesPromise = recipes.map(format);

      return Promise.all(recipesPromise);
    } catch (err) {
      console.error(err);
    }
  },
  async recipeWithDeleted() {
    try {
      let recipe = await Recipe.findOneWithDeleted(this.filter);
      return format(recipe);
    } catch (err) {
      console.error(err);
    }
  },
  format,
};

module.exports = LoadServices;
