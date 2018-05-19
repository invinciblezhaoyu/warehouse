const pool = require('./pool');

module.exports = {
  getSupplierList() {
    let sql = `SELECT * FROM warehouse_db.suppliers`;
    return pool.execute(sql);
  },
  addSupplier(supplier) {
    const sql = `INSERT INTO warehouse_db.suppliers VALUES (
      ${supplier.SupplierID},
      '${supplier.SupplierName}',
      '${supplier.SupplierAddre}',
      '${supplier.SupplierTel}',
      '${supplier.createTime}','');`
    return pool.execute(sql);
  },
  updateSupplier(supplier) {
    const sql = `UPDATE warehouse_db.suppliers SET 
    SupplierName = '${supplier.SupplierName}', 
      SupplierTel = '${supplier.SupplierTel}',  
      SupplierAddre = '${supplier.SupplierAddre}'  
      WHERE SupplierID = ${supplier.SupplierID}`;
    return pool.execute(sql);
  },
  deleteSupplier(SupplierID) {
    const sql = `DELETE FROM warehouse_db.suppliers WHERE SupplierID = ${SupplierID}`
    return pool.execute(sql);
  },
}
