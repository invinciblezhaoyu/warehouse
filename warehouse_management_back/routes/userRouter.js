const express = require('express');
const router = express.Router();

const userDB = require('../db/userDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("<h1>welcome to express</h1>");
});
router.post('/managerLogin', function(req, res, next) {
  let { userName, password } = req.body;
  userDB.managerLogin().then((data) => {
    let values = data.filter(item => item.ManagerName === userName);
    if(values.length === 0) res.send({msg:'没有此用户！'});
    let value = values.find(item => item.password === password)
    if(value)res.send(value);
    else res.send({msg:'账户密码错误！'});
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/userLogin', function(req, res, next) {
  let { userName, password } = req.body;
  userDB.userLogin().then((data) => {
    let values = data.filter(item => item.ManagerName === userName);
    if(values.length === 0) res.send({msg:'没有此用户！'});
    let value = values.find(item => item.Managerpwd === password)
    if(value)res.send(value);
    else res.send({msg:'账户密码错误！'});
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/allManager', function(req, res, next) {
  userDB.userLogin().then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
