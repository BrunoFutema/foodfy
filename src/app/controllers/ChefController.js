const Chef = require('../models/Chef');
const LoadChefService = require('../services/LoadChefService');
const LoadRecipeService = require('../services/LoadRecipeService');

module.exports = {
  async index(req, res) {
    try {
      const chefs = await LoadChefService.load('chefs');
      
      return res.render('admin/chefs/index', { chefs });
    } catch (err) {
      console.error(err);
    }
  },
  create(req, res) {
    return res.render('admin/chefs/create');
  },
  async post(req, res) {
    try {
      let { name, avatar_url } = req.body;

      await Chef.create({ name, avatar_url });

      return res.redirect('/admin/chefs');
    } catch (err) {
      console.error(err);
    }
  },
  async show(req, res) {
    try {
      const chef_id = req.params.id;

      const chef = await LoadChefService.load('chef', { where: { id: chef_id } });

      let recipes = await LoadRecipeService.load('recipes', { where: { chef_id } });

      recipes = recipes.map(recipe => ({
        ...recipe,
        author: chef.name,
      }));

      const quantityRecipes = recipes.length;

      return res.render('admin/chefs/show', { chef, quantityRecipes, recipes });
    } catch (err) {
      console.error(err);
    }
  },
  async edit(req, res) {
    try {
      const chef = await LoadChefService.load('chef', {
        where: {
          id: req.params.id,
        },
      });

      return res.render('admin/chefs/edit', { chef });
    } catch (err) {
      console.error(err);
    }
  },
  async put(req, res) {
    try {
      const { name, avatar_url } = req.body;
    
      await Chef.update(req.body.id, {
        name,
        avatar_url,
      });

      return res.redirect(`/admin/chefs/${req.body.id}`);
    } catch (err) {
      console.error(err);
    }
  },
  async delete(req, res) {
    try {
      await Chef.delete(req.body.id);
      return res.redirect('/admin/chefs');
    } catch (err) {
      console.error(err);
    }
  },
};
