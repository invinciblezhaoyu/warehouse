const pool = require('./pool');

module.exports = {
  getAllGoods(id) {
    let sql = `SELECT * FROM warehouse_db.goods WHERE GoodsStorID = ${id}`;
    // let sql = `SELECT * FROM warehouse_db.goods`;
    return pool.execute(sql);
  },
  instoreGoods(order) {
    let instoreSql = `INSERT INTO warehouse_db.instore (GoodsID,SupplierID,InstorGoodsQty,StorageID,ManagerID,orderID) VALUES `;
    for (let index = 0; index < order.list.length; index++) {
      const element = order.list[index];
      let instoreNextSql = `(${element.GoodsID},${order.SupplierID},${element.InstorGoodsQty},${element.StorageID},${order.ManagerID},${order.orderID})`;
      let goodsSql = `UPDATE warehouse_db.goods SET GoodsQty = GoodsQty + ${element.InstorGoodsQty} WHERE GoodsID = ${element.GoodsID}`;
      pool.execute(goodsSql);
      instoreSql += instoreNextSql;
      index === order.list.length - 1 ? instoreSql +=';' : instoreSql += ',' ;
    }
    return pool.execute(instoreSql);
  },
  
}
