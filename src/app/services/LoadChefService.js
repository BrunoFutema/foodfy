const Chef = require('../models/Chef');
const File = require('../models/File');

async function getImage(fileId) {
  let file = await File.find(fileId);

  file.src = `${file.path.replace('public', '')}`;

  return file;
};

async function format(chef) {
  const file = await getImage(chef.file_id);

  chef.img = file.src;

  if (chef.img) chef.img = chef.img.replace('\\', '/').replace('\\', '/');

  return chef;
};

const LoadServices = {
  load(service, filter, order) {
    this.filter = filter;
    this.order = order;
    return this[service]();
  },
  async chef() {
    try {
      const chef = await Chef.findOne(this.filter);
      return format(chef);
    } catch (err) {
      console.error(err);
    }
  },
  async chefs() {
    try {
      const chefs = await Chef.findAll(this.filter, this.order);
      const chefsPromise = chefs.map(format);

      return Promise.all(chefsPromise);
    } catch (err) {
      console.error(err);
    }
  },
  async chefWithDeleted() {
    try {
      let chef = await Chef.findOneWithDeleted(this.filter);
      return format(chef);
    } catch (err) {
      console.error(err);
    }
  },
  format,
};

module.exports = LoadServices;
