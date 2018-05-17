var express = require('express');
var router = express.Router();

const orderDB = require('../db/orderDB');

router.get('/allOrder', function(req, res, next) {
    let managerID = req.query.managerID;
    let page = req.query.page;
    // console.log(managerID);
    // console.log(page);
    orderDB.getOrderList(managerID,page).then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
    });
  });

module.exports = router;
