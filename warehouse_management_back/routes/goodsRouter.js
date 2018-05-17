var express = require('express');
var router = express.Router();

const goodsDB = require('../db/goodsDB');
const orderDB = require('../db/orderDB');

/* GET home page. */
router.get('/allGoods', function(req, res, next) {
  let id = req.query.id;
  goodsDB.getAllGoods(id).then(data => {
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

module.exports = router;
