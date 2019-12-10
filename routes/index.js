var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('홍길동', { title: '홍길동' });
});

module.exports = router;
