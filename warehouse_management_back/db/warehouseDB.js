const pool = require('./pool');

module.exports = {
  getAllWare() {
    const sql = `SELECT * FROM warehouse_db.storage;`;
    return pool.execute(sql);
  },
  addWare(student) {
    let sql = `INSERT INTO warehouse_db.storage (StorageID,StorageName,StorageAddre,StoManID) VALUES `;
    student.forEach(( item, index ) => {
      let str = `('${item.StorageID}','${item.StorageName}','${item.StorageAddre}',${item.StoManID})`;
      if (student.length !== index + 1) sql += str;
      sql += str;
    });
    return pool.execute(sql);
  },
  deleteWare(StorageID) {
    var sql = `DELETE FROM warehouse_db.storage WHERE StorageID = ${StorageID}`;
    return pool.execute(sql);
  },
}