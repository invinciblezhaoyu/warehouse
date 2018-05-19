var express = require('express');
var router = express.Router();

const goodsDB = require('../db/goodsDB');
const orderDB = require('../db/orderDB');

/* GET home page. */
router.get('/allGoods', function(req, res, next) {
  goodsDB.getAllGoods().then(data => {
    res.send(data);
  }).catch(err => {
    console.log(err);
  });
});
router.get('/goodsType', function(req, res, next) {
  let wareId = req.query.wareId;
  goodsDB.getGoodsTypeByWareId(wareId).then(data => {
    res.send(data);
  }).catch(err => {
    console.log(err);
  });
});
router.post('/instore', function (req, res, next) {
  let order = req.body;
  goodsDB.instoreGoods(order).then( data => {
    if(data.affectedRows > 0) {
      orderDB.addOrder(order).then( result => {
        res.send(result);
      }).catch( error => {
        console.log(error);
      });
    }
  }).catch( err => {
    console.log(err);
  });
});
router.post('/outstore', function (req, res, next) {
  let order = req.body;
  goodsDB.outstoreGoods(order).then( data => {
    if(data.affectedRows > 0) {
      orderDB.addOrder(order).then( result => {
        res.send(result);
      }).catch( error => {
        console.log(error);
      });
    }
  }).catch( err => {
    console.log(err);
  });
});
router.post('/addNewGoods', function (req, res, next) {
  let good = req.body;
  goodsDB.addNewGoods(good).then( data => {
    res.send(data);
  }).catch( err => {
    console.log(err);
  });
});
router.post('/updateGoods', function (req, res, next) {
  let good = req.body;
  goodsDB.updateGoods(good).then( data => {
    res.send(data);
  }).catch( err => {
    console.log(err);
  });
});
router.delete('/deleteGoods', function (req, res, next) {
  let GoodsID = req.body.StorageID;
  goodsDB.deleteGoods(GoodsID).then( data => {
    res.send(data);
  }).catch( err => {
    console.log(err);
  });
});

module.exports = router;
