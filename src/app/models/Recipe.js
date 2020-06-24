const Base = require('./Base');
const db = require('../../config/db');

Base.init({ table: 'recipes' });

module.exports = {
  ...Base,
  async files(id) {
    const results = await db.query(`
      SELECT * FROM files WHERE recipe_id = $1
    `, [id]);

    return results.rows;
  },
  async search({ filter }) {
    let query = `
      SELECT recipes.*
      FROM recipes
      WHERE 1 = 1`;
    
    if (filter) {
      query += ` AND (recipes.title ILIKE '%${filter}%')`;
    }

    const results = await db.query(query);
    return results.rows;
  }
};
