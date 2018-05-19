var express = require('express');
var router = express.Router();

const orderDB = require('../db/orderDB');

router.get('/allOrder', function(req, res, next) {
  let managerID = req.query.managerID;
  let page = req.query.page;
  let sign = req.query.sign;
  orderDB.getOrderList(managerID,page,sign).then(data => {
    orderDB.getOrderCount(managerID,sign).then( result => {
      res.send({data,result});
    }).then(error => {
      console.log(error);
    });
  }).catch(err => {
    console.log(err);
  });
});
router.get('/oneOrder', function(req, res, next) {
  let orderID = req.query.orderID;
  orderDB.getOrderById(orderID).then(data => {
    res.send(data);
  }).catch(err => {
    console.log(err);
  });
});
router.get('/oneOutOrder', function(req, res, next) {
  let orderID = req.query.orderID;
  orderDB.getOutOrderById(orderID).then(data => {
    res.send(data);
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;
