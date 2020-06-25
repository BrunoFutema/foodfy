const Chef = require('../models/Chef');
const File = require('../models/File');
const RecipeFiles = require('../models/RecipeFiles');
const Recipe = require('../models/Recipe');
const LoadChefService = require('../services/LoadChefService');
const LoadRecipeService = require('../services/LoadRecipeService');

module.exports = {
  async index(req, res) {
    try {
      let recipes = await LoadRecipeService.load('recipes', null, {
        created_at: 'DESC'
      });
  
      const recipesPromise = recipes.map(async (recipe) => {
        const chef = await Chef.find(recipe.chef_id);
        
        return {
          ...recipe,
          author: chef.name,
        };
      });

      recipes = await Promise.all(recipesPromise);
      
      if (req.session.user) {
        if (req.session.user.is_admin) 
          return res.render('admin/recipes/index', { recipes });
      }

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
      let { title, chef_id, ingredients, preparation, information } = req.body;

      const recipe_id = await Recipe.create({
        title,
        chef_id,
        ingredients,
        preparation,
        information,
      });

      req.files.map(async file => {
        const file_id = await File.create({
          name: file.filename,
          path: file.path,
        });

        await RecipeFiles.create({
          recipe_id,
          file_id,
        });
      });
      
      return res.redirect(`/admin/recipes/${recipe_id}/edit`);
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
      recipe.information = recipe.information.split('\n').join('<br />');

      return res.render('recipes/show', { recipe });
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

      const chefs = await LoadChefService.load('chefs');

      return res.render('admin/recipes/edit', { recipe, chefs });
    } catch (err) {
      console.error(err);
    }
  },
  async put(req, res) {
    try {
      if (req.files.length != 0) {
        req.files.map(async file => {
          const file_id = await File.create({
            name: file.filename,
            path: file.path,
          });

          await RecipeFiles.create({
            recipe_id: req.body.id,
            file_id,
          });
        });
      }

      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(',');
        const lastIndex = removedFiles.length - 1;
        removedFiles.splice(lastIndex, 1);
  
        removedFiles.map(async id => {
          await RecipeFiles.deleteByFileId(id);
          await File.delete(id);
        });
      }

      let { title, chef_id, ingredients, preparation, information } = req.body;

      const recipe = await Recipe.find(req.body.id);

      if (recipe.user_id != req.session.userId) return res.render('admin/users/index', {
        error: 'Você não pode editar uma receita de outro usuário!',
      });
    
      await Recipe.update(req.body.id, {
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
      const recipe = await Recipe.find(req.body.id);

      if (recipe.user_id != req.session.userId) return res.render('admin/users/index', {
        error: 'Você não pode excluir uma receita de outro usuário!',
      });

      await Recipe.delete(req.body.id);
      return res.redirect('/admin/recipes');
    } catch (err) {
      console.error(err);
    }
  },
};
