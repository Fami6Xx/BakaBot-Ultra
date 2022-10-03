const express = require('express');
const router = express.Router();

const root = __dirname.replace('\\routes', "");

/* Require authentication */
router.all("*", (req, res, next) => {
  if(req.session.loggedin && req.session.timeout > Date.now()) {
    next();
  }else{
    // This will redirect to login page
    res.sendFile("public/login/login/index.html", {root: root});
  }
});

/* GET private listings. */
router.get("/", (req, res, next) => {
  res.sendFile("private/", {root: root})
});

module.exports = router;
