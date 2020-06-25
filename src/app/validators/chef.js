async function post(req, res, next) {
  const keys = Object.keys(req.body);
  
  for (key of keys) {
    if (req.body[key] == '') return res.send('Por favor, volte e preencha todos os campos.');
  }

  if (!req || req.file.length == 0) return res.send('Por favor, envie um avatar do chef.');

  next();
};

async function put(req, res, next) {
  const keys = Object.keys(req.body);
  
  for (key of keys) {
    if (req.body[key] == '' && key != 'removed_files' && key != 'avatar') return res.send('Por favor, volte e preencha todos os campos.');
  }
  
  next();
};

module.exports = {
  post,
  put,
};
