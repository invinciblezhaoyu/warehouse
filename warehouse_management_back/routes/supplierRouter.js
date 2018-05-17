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

module.exports = router;
