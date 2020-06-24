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

      console.log(req.params);

      let recipe = await LoadRecipeService.load('recipe', { where: { id: recipe_id } });

      const chef = await LoadChefService.load('chef', { where: { id: recipe.chef_id } });

      recipe.author = chef.name;

      console.log(req.admin);

      if (req.admin) return res.render('admin/recipes/show', { recipe });

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
