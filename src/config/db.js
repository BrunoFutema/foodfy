const { Pool } = require('pg');

module.exports = new Pool({
  user: 'root',
  password: 'bfutema',
  host: 'localhost',
  port: 5432,
  database: 'foodfy',
});
