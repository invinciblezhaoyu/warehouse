const pool = require('./pool');

module.exports = {
  getSupplierList(managerID) {
    let sql = `SELECT * FROM warehouse_db.suppliers`;
    return pool.execute(sql);
  },
}
