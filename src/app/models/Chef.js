const Base = require('./Base');
const db = require('../../config/db');

Base.init({ table: 'chefs' });

module.exports = {
  ...Base,
  async file(id) {
    const results = await db.query(`
      SELECT * FROM files WHERE chef_id = $1
    `, [id]);

    return results.rows[0];
  },
};
