const pool = require('./pool');

module.exports = {
  getOrderList(managerID,page) {
    console.log(managerID,page);
    let sql = `SELECT * FROM warehouse_db.order WHERE managerID = ${managerID} limit ${page},8`;
    return pool.execute(sql);
  },
  addOrder(order) {
    let sql = `INSERT INTO warehouse_db.order VALUES (${order.orderID},'${order.InstoreDate}',${order.ManagerID},${order.SupplierID},'${order.orderName}')`;
    return pool.execute(sql);
  }
}
