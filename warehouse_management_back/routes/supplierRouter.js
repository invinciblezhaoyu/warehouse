var express = require('express');
var router = express.Router();

const supplierDB = require('../db/supplierDB');


router.get('/allSupplier', function(req, res, next) {
  supplierDB.getSupplierList().then(data => {
    res.send(data);
  }).catch(err => {
    console.log(err);
  });
});

router.post('/addSupplier', function(req, res, next) {
  let supplier = req.body;
  supplierDB.addSupplier(supplier).then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(err);
  });
});

router.put('/updateSupplier', function(req, res, next) {
  let supplier = req.body;
  supplierDB.updateSupplier(supplier).then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(err);
  });
});

router.delete('/deleteSupplier', function(req, res, next) {
  let SupplierID = req.body.SupplierID;
  supplierDB.deleteSupplier(SupplierID).then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
