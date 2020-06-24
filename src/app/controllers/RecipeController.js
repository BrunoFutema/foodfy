const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');
const LoadChefService = require('../services/LoadChefService');
const LoadRecipeService = require('../services/LoadRecipeService');

module.exports = {
  async index(req, res) {
    try {
      let recipes = await LoadRecipeService.load('recipes');
  
      const recipesPromise = recipes.map(async (recipe) => {
        const chef = await Chef.find(recipe.chef_id);
        
        return {
          ...recipe,
          author: chef.name,
        };
      });
  
      recipes = await Promise.all(recipesPromise);
  
      if (req.admin) return res.render('admin/recipes/index', { recipes });

      return res.render('recipes/index', { recipes });
    } catch (err) {
      console.error(err);
    }
  },
  async create(req, res) {
    try {
      const chefs = await LoadChefService.load('chefs');

      return res.render('admin/recipes/create', { chefs });
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

      if (req.admin) return res.render('admin/recipes/show', { recipe });

      return res.render('admin/recipes/show', { recipe });
    } catch (err) {
      console.error(err);
    }
  },
  async edit(req, res) {
    try {
      const recipe = await LoadRecipeService.load('recipe', {
        where: {
          id: req.params.id,
        },
      });

      return res.render('admin/recipes/edit', { recipe });
    } catch (err) {
      console.error(err);
    }
  },
  async put(req, res) {
    try {
      let { image, title, chef_id, ingredients, preparation, information } = req.body;
    
      await Recipe.update({
        image,
        title,
        chef_id,
        ingredients,
        preparation,
        information,
      });

      return res.redirect(`/admin/recipes/${req.body.id}`);
    } catch (err) {
      console.error(err);
    }
  },
  async delete(req, res) {
    try {
      await Recipe.delete(req.body.id);
      return res.redirect('/admin/recipes');
    } catch (err) {
      console.error(err);
    }
  },
};
