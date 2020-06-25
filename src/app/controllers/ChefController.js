const Chef = require('../models/Chef');
const File = require('../models/File');
const LoadChefService = require('../services/LoadChefService');
const LoadRecipeService = require('../services/LoadRecipeService');

module.exports = {
  async index(req, res) {
    try {
      const chefs = await LoadChefService.load('chefs', null, {
        created_at: 'DESC',
      });

      return res.render('chefs/index', { chefs });
    } catch (err) {
      console.error(err);
    }
  },
  create(req, res) {
    return res.render('admin/chefs/create');
  },
  async post(req, res) {
    try {
      let { name } = req.body;

      const file_id = await File.create({
        name: req.file.filename,
        path: req.file.path,
      });

      const chef_id = await Chef.create({ name, file_id });
        
      return res.redirect(`/admin/chefs/${chef_id}/edit`);
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

      return res.render('chefs/show', { chef, quantityRecipes, recipes });
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
      if (req.file) {
        if (req.file.length != 0) {
          const avatarPromise = File.create({
            name: file.filename,
            path: file.path,
          });
  
          await Promise.all(avatarPromise);
        }
      }

      if (req.file && req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(',');
        const lastIndex = removedFiles.length - 1;
        removedFiles.splice(lastIndex, 1);
  
        const newAvatarPromise = removedFiles.map(id => File.delete(id));

        await Promise.all(newAvatarPromise);
      }

      const { name } = req.body;
    
      await Chef.update(req.body.id, {
        name,
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
