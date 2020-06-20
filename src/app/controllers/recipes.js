module.exports = {
  index(req, res) {
    return res.render('recipes/index', { recipes: data.recipes });
  },
  show(req, res) {
    const { index } = req.params;
  
    return res.render('recipes/show');
  }
};
