const Base = require('./Base');
const db = require('../../config/db');

Base.init({ table: 'recipes' });

module.exports = {
  ...Base,
  async insert(fields) {
    try {
      let keys = [], values = [];

      Object.keys(fields).map(key => {
        keys.push(key);
        if (typeof fields[key] === 'object') {
          values.push(`'{${fields[key]}}'`);
        } else {
          values.push(`'${fields[key]}'`);
        }
      });

      const query = `INSERT INTO ${this.table} (${keys.join(',')})
        VALUES (${values.join(',')})
        RETURNING id
      `;

      console.log(query);

      const results = await db.query(query);

      return results.rows[0].id;
    } catch (err) {
      console.error(err);
    }
  },
  async files(id) {
    const results = await db.query(`
      SELECT files.* FROM files
      LEFT JOIN recipe_files ON files.id = recipe_files.file_id
      WHERE recipe_id = $1
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
