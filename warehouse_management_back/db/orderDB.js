const pool = require('./pool');

module.exports = {
  getOrderCount(managerID,sign) {
    const sql = `SELECT COUNT(*) FROM warehouse_db.order WHERE managerID = ${managerID} AND sign = ${sign};`;
    return pool.execute(sql);
  },
  getOrderList(managerID,page,sign) {
    let sql = `SELECT * FROM warehouse_db.order WHERE managerID = ${managerID} AND sign = ${sign} limit ${page},8`;
    return pool.execute(sql);
  },
  addOrder(order) {
    order.SupplierID = order.ClientID;
    let sql = `INSERT INTO warehouse_db.order VALUES (${order.orderID},'${order.InstoreDate}',${order.ManagerID},${order.SupplierID},'${order.orderName}',${order.sign})`;
    return pool.execute(sql);
  },
  getOrderById(orderID) {
    let sql = `SELECT * FROM warehouse_db.instore WHERE orderID = ${orderID}`;
    return pool.execute(sql);
  },
  getOutOrderById(orderID){
    let sql = `SELECT * FROM warehouse_db.outstore WHERE orderID = ${orderID}`;
    return pool.execute(sql);
  },
}
