const Recipe = require('../models/Recipe');
const LoadChefService = require('../services/LoadChefService');
const LoadRecipeService = require('../services/LoadRecipeService');

module.exports = {
  index(req, res) {},
  async create(req, res) {
    try {
      const chefs = await LoadChefService.load('chefs');

      return res.render('recipes/create', { chefs });
    } catch (err) {
      console.error(err);
    }
  },
  async post(req, res) {
    try {
      let { image, title, chef_id, ingredients, preparation, information } = req.body;
  
      const recipe_id = await Recipe.create({
        image,
        title,
        chef_id,
        ingredients,
        preparation,
        information,
      });
      
      return res.redirect(`/recipes/${recipe_id}/edit`);
    } catch (err) {
      console.error(err);
    }
  },
  async show(req, res) {
    try {
      const recipe_id = req.params.id;

      let recipe = await LoadRecipeService.load('recipe', { where: { id: recipe_id } });

      const chef = await LoadChefService.load('chef', { where: { id: recipe.chef_id } });

      recipe.author = chef.name;

      return res.render('recipes/show', { recipe });
    } catch (err) {
      console.error(err);
    }
  },
  edit(req, res) {
    const { index } = req.params;
  
    return res.render('admin/edit');
  },
  put(req, res) {
    const { index } = req.body;
  
    return res.redirect(`/recipes/${index}`);
  },
  delete(req, res) {
    return res.redirect('/recipes/create');
  },
};
