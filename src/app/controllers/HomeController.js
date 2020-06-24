const Chef = require('../models/Chef');
const LoadRecipeService = require('../services/LoadRecipeService');

module.exports = {
  async index(req, res) {
    try {
      const allRecipes = await LoadRecipeService.load('recipes');
      let recipes = allRecipes && allRecipes.filter((recipe, index) => index > 5 ? false : true);

      const recipesPromise = recipes.map(async (recipe) => {
        const chef = await Chef.find(recipe.chef_id);
        
        return {
          ...recipe,
          author: chef.name,
        };
      });

      recipes = await Promise.all(recipesPromise);

      return res.render('home/index', { recipes });
    } catch (err) {
      console.error(err);
    }
  },
};
