module.exports = {
  index(req, res) {
    return res.render('admin/index');
  },
  show(req, res) {
    const { index } = req.params;
    const recipe = data.recipes[index];
  
    if (!recipe) return res.render('not-found');
  
    recipe.index = index;
    recipe.information = recipe.information.split('\n').join('<br />');
  
    return res.render('admin/show', { recipe });
  },
  delete(req, res) {
    const { index } = req.body;
    return res.redirect('/admin/recipes');
  }
};
