var express = require('express');
var router = express.Router();

const warehouseDB = require('../db/warehouseDB');

router.get('/allStorage', function(req, res, next) {
  warehouseDB.getAllWare(req.query.page).then(data => {
    warehouseDB.getAllWareCount().then(result => {
      res.send({data,result});
    })
  }).catch(error => {
    console.log(error);
  });
})
router.get('/allStorageById', function(req, res, next) {
  warehouseDB.getAllWareById(req.query.ManagerID,req.query.page).then(data => {
    warehouseDB.getAllWareCountById(req.query.ManagerID).then( result => {
      res.send({data,result});
    })
  }).catch(error => {
    console.log(error);
  });
})
router.post('/addStorage',function(req, res, next) {
  let storage = req.body;
  warehouseDB.addWare(storage).then(data => {
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
router.put('/updateStorage',function(req, res, next) {
  let storage = req.body;
  warehouseDB.updateWare(storage).then(data => {
    res.send(data);
  }).catch(error => {
    console.log(error);
  });
})

module.exports = router;
