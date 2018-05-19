const pool = require('./pool');

module.exports = {
  getAllGoods() {
    let sql = `SELECT * FROM warehouse_db.goods`;
    return pool.execute(sql);
  },
  instoreGoods(order) {
    let instoreSql = `INSERT INTO warehouse_db.instore (GoodsID,SupplierID,InstorGoodsQty,InstoreDate,StorageID,ManagerID,orderID) VALUES `;
    for (let index = 0; index < order.list.length; index++) {
      const element = order.list[index];
      let instoreNextSql = `(${element.GoodsID},${order.SupplierID},${element.InstorGoodsQty},'${order.InstoreDate}',${element.StorageID},${order.ManagerID},${order.orderID})`;
      let goodsSql = `UPDATE warehouse_db.goods SET GoodsQty = GoodsQty + ${element.InstorGoodsQty} WHERE GoodsID = ${element.GoodsID}`;
      pool.execute(goodsSql);
      instoreSql += instoreNextSql;
      index === order.list.length - 1 ? instoreSql +=';' : instoreSql += ',' ;
    }
    return pool.execute(instoreSql);
  },
  outstoreGoods(order) {
    let outstoreSql = `INSERT INTO warehouse_db.outstore (GoodsID,ClientID,OutstorGoodsQty,OutstorDate,ManagerID,orderID) VALUES `;
    for (let index = 0; index < order.list.length; index++) {
      const element = order.list[index];
      let outstoreNextSql = `(${element.GoodsID},${order.ClientID},${element.OutstorGoodsQty},'${order.OutstoreDate}',${order.ManagerID},${order.orderID})`;
      let goodsSql = `UPDATE warehouse_db.goods SET GoodsQty = GoodsQty + ${element.OutstorGoodsQty} WHERE GoodsID = ${element.GoodsID}`;
      pool.execute(goodsSql);
      outstoreSql += outstoreNextSql;
      index === order.list.length - 1 ? outstoreSql +=';' : outstoreSql += ',' ;
    }
    return pool.execute(outstoreSql);
  },
  getGoodsTypeByWareId(wareId) {
    let sql = `SELECT * from warehouse_db.goods WHERE GoodsStorID = ${wareId}`
    return pool.execute(sql);
  },
  addNewGoods(good) {
    let sql = `INSERT INTO warehouse_db.goods (GoodsID,GoodsName,GoodsType,GoodsQty,GoodsPrize,GoodsStorID) VALUES('${good.GoodsID}','${good.GoodsName}','${good.GoodsType}',0,${good.GoodsPrize},'${good.StorageID}')`;
    return pool.execute(sql);
  },
  updateGoods(good) {
    let sql = `UPDATE warehouse_db.goods SET 
    GoodsName = '${good.GoodsName}',
    GoodsType = '${good.GoodsType}',
    GoodsPrize = ${good.GoodsPrize}
    WHERE GoodsID = '${good.GoodsID}'`;
    return pool.execute(sql);
  },
  deleteGoods(GoodsID) {
    let sql = `DELETE FROM warehouse_db.goods WHERE GoodsID = ${GoodsID}`
    return pool.execute(sql);
  }
}
