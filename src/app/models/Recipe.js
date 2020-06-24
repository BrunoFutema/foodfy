const Base = require('./Base');
const db = require('../../config/db');

Base.init({ table: 'recipes' });

module.exports = {
  ...Base,
  async files(id) {
    const results = await db.query(`
      SELECT files.* FROM files
      LEFT JOIN recipe_files ON files.id = recipe_files.file_id
      WHERE recipe_id = $1
    `, [id]);

    return results.rows;
  },
  async author(id) {
    const results = await db.query(`
      SELECT chefs.* FROM chefs
      LEFT JOIN recipes ON chefs.id = recipes.chef_id
      WHERE recipes.id = $1
    `, [id]);

    return results.rows[0];
  },
  async search({ filter }) {
    let query = `
      SELECT recipes.*
      FROM recipes
      WHERE 1 = 1`;
    
    if (filter) {
      query += ` AND (recipes.title ILIKE '%${filter}%')`;
    }

    query += 'ORDER BY updated_at DESC';

    const results = await db.query(query);
    return results.rows;
  },
};
