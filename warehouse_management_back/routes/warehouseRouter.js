var express = require('express');
var router = express.Router();

const warehouseDB = require('../db/warehouseDB');

/* GET home page. */
router.get('/allStorage', function(req, res, next) {
  warehouseDB.getAllWare().then(data => {
    res.send(data);
  }).catch(error => {
    console.log(error);
  });
})
router.post('/addStorage',function(req, res, next) {
  let student = req.body;
  warehouseDB.addWare(student).then(data => {
    res.send(data);
  }).catch(error => {
    console.log(error);
  });
})
router.delete('/deleteStorage',function(req, res, next) {
  let StorageID = req.body.StorageID;
  warehouseDB.deleteWare(StorageID).then(data => {
    res.send(data);
  }).catch(error => {
    console.log(error);
  });
})

module.exports = router;
