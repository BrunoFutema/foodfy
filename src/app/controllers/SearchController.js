const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');
const LoadRecipeService = require('../services/LoadRecipeService');

module.exports = {
  async index(req, res) {
    try {
      let { filter } = req.query;

      if (!filter) filter = null;

      let recipes = await Recipe.search({ filter });

      const recipesPromise = recipes.map(async (recipe) => {
        const chef = await Chef.find(recipe.chef_id);
        
        return {
          ...recipe,
          author: chef.name,
        };
      });
      
      recipes = await Promise.all(recipesPromise);
      
      const search = {
        term: filter || 'Tudo',
        total: recipes.length,
      };

      return res.render('search/index', { recipes, search });
    } catch (err) {
      console.error(err);
    }
  },
};
