module.exports = {
  index(req, res) {
    return res.render('admin/index');
  },
  create(req, res) {
    return res.render('admin/create');
  },
  post(req, res) {
    const keys = Object.keys(req.body);
  
    for (key of keys) {
      if (req.body[key] == '') return res.send('Please, fill all fields!');
    }
  
    let { image, title, author, ingredients, preparations, information } = req.body;
    
    return res.redirect('/admin/recipes');
  },
  show(req, res) {
    const { index } = req.params;
    const recipe = data.recipes[index];
  
    if (!recipe) return res.render('not-found');
  
    recipe.index = index;
    recipe.information = recipe.information.split('\n').join('<br />');
  
    return res.render('admin/show', { recipe });
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
    const { index } = req.body;
    return res.redirect('/admin/recipes');
  }
};
