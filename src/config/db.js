const { Pool } = require('pg');

module.exports = new Pool({
  user: 'postgres',
  password: 'pass',
  host: 'localhost',
  port: 5432,
  database: 'foodfy',
});
