const express = require('express');
const router = express.Router();

const root = __dirname.replace('\\routes', "");

/* Require authentication */
router.all("*", (req, res, next) => {
  if(req.session.loggedin && req.session.timeout > Date.now()) {
    next();
  }else{
    // This will redirect to login page
    req.session.loggedin = true;
    req.session.timeout = Date.now() + 1800000; // Half Hour = 1 800 000 ms
    res.sendStatus(400);
  }
});

/* GET private listings. */
router.get("/", (req, res, next) => {
  res.sendFile("private/index.html", {root: root})
});

module.exports = router;
