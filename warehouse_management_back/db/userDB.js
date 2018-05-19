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
  addManager(manager) {
    const sql = `INSERT INTO warehouse_db.managers VALUES (
      ${manager.ManagerID},
      '${manager.ManagerName}',
      '${manager.ManagerSex}',
      'in',
      '123456',
      '${manager.ManagerTel}',
      '${manager.ManagerAddre}')`
    return pool.execute(sql);
  },
  updateManager(manager) {
    const sql = `UPDATE warehouse_db.managers 
    SET ManagerName = '${manager.ManagerName}', 
    ManagerSex = '${manager.ManagerSex}', 
    ManagerTel = '${manager.ManagerTel}',  
    ManagerAddre = '${manager.ManagerAddre}'  
    WHERE ManagerID = ${manager.ManagerID}`;
    return pool.execute(sql);
  },
  deleteManager(ManagerID) {
    const sql = `DELETE FROM warehouse_db.managers WHERE ManagerID = ${ManagerID}`
    return pool.execute(sql);
  },
}
