const Base = require('./Base');
const db = require('../../config/db');

Base.init({ table: 'recipe_files' });

module.exports = {
  ...Base,
  deleteByFileId(fileId) {
    return db.query(`DELETE FROM ${this.table} WHERE file_id = $1`, [fileId]);
  },
};
