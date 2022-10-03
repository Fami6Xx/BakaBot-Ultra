const express = require('express');
const router = express.Router();

const root = __dirname.replace('\\routes', "");

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('public/mainPage/index.html', { root: root});
});

module.exports = router;
