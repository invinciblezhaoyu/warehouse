const pool = require('./pool');

module.exports = {
  managerLogin() {
    const sql = `SELECT * FROM warehouse_db.manager;`;
    return pool.execute(sql);
  },
  userLogin() {
    const sql = `SELECT * FROM warehouse_db.managers;`;
    return pool.execute(sql);
  },
}
