const db = require('../../config/db');

function find(filters, table, order) {
  let query = `SELECT * FROM ${table}`;

  if (filters) {
    Object.keys(filters).map(key => {
      query += ` ${key}`;

      Object.keys(filters[key]).map(field => {
        query += ` ${field} = '${filters[key][field]}'`;
      });
    });
  }

  if (order) {
    Object.keys(order).map(key => {
      query += ` ORDER BY`;

      query += ` ${key} ${order[key]}`;
    });
  }

  return db.query(query);
};

const Base = {
  init({ table }) {
    if (!table) throw new Error('Invalid Params.');

    this.table = table;

    return this;
  },
  async find(id) {
    const results = await find({ where: { id }}, this.table);
    return results.rows[0];
  },
  async findOne(filters) {
    const results = await find(filters, this.table);
    return results.rows[0];
  },
  async findAll(filters, order) {
    const results = await find(filters, this.table, order);
    return results.rows;
  },
  async findOneWithDeleted(filters) {
    const results = await find(filters, `${this.table}_with_deleted`);
    return results.rows[0];
  },
  async create(fields) {
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

      const results = await db.query(query);

      return results.rows[0].id;
    } catch (err) {
      console.error(err);
    }
  },
  update(id, fields) {
    try {
      let update = [];

      Object.keys(fields).map(key => {
        if (typeof fields[key] === 'object') {
          const line = `${key} = '{${fields[key]}}'`;
          update.push(line);
        } else {
          const line = `${key} = '${fields[key]}'`;
          update.push(line);
        }
      });

      let query = `UPDATE ${this.table} SET
      ${update.join(',')} WHERE id = ${id}`;

      return db.query(query);
    } catch (err) {
      console.error(err);
    }
  },
  delete(id) {
    return db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
  },
};

module.exports = Base;
