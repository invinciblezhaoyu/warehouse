const pool = require('./pool');

module.exports = {
  getAllWareCount() {
    const sql = `SELECT COUNT(*) FROM warehouse_db.storage;`;
    return pool.execute(sql);
  },
  getAllWareCountById(StoManID) {
    const sql = `SELECT COUNT(*) FROM warehouse_db.storage WHERE StoManID = ${StoManID};`;
    return pool.execute(sql);
  },
  getAllWare(page) {
    const sql = `SELECT * FROM warehouse_db.storage limit ${page},8;`;
    return pool.execute(sql);
  },
  getAllWareById(StoManID,page) {
    const sql = `SELECT * FROM warehouse_db.storage WHERE StoManID = ${StoManID} limit ${page},8;`;
    return pool.execute(sql);
  },
  addWare(storage) {
    let sql = `INSERT INTO warehouse_db.storage (StorageID,StorageName,StorageAddre,StoManID,createTime) VALUES `;
    storage.forEach(( item, index ) => {
      let str = `('${item.StorageID}','${item.StorageName}','${item.StorageAddre}',${item.StoManID},'${item.createTime}')`;
      if (storage.length !== index + 1) sql += str;
      sql += str;
    });
    return pool.execute(sql);
  },
  deleteWare(StorageID) {
    var sql = `DELETE FROM warehouse_db.storage WHERE StorageID = ${StorageID}`;
    return pool.execute(sql);
  },
  updateWare(storage) {
    let sql = `UPDATE warehouse_db.storage 
    SET StorageName = '${storage.StorageName}', 
    StorageAddre = '${storage.StorageAddre}', 
    StoManID = '${storage.StoManID}', 
    createTime = '${storage.createTime}' 
    WHERE StorageID = ${storage.StorageID}`;
    return pool.execute(sql);
  },
}