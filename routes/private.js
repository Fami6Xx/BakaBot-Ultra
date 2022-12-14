const express = require('express');
const router = express.Router();

/* Require authentication */
router.all("*", (req, res, next) => {
  if(req.session.loggedin && req.session.timeout > Date.now()) {
    next();
  }else{
    // This will redirect to login page
    if(req.session.timeout > Date.now()) {
      req.session.loggedin = false;
      req.session.timeout = 0;
      req.session.username = null;
    }
    res.redirect("/login");
  }
});

/* GET private listings. */
router.get("/", (req, res, next) => {
  next();
});

router.get("/logout", (req, res, next) => {
  if(req.session.loggedin){
    req.session.loggedin = false;
    req.session.timeout = 0;
    res.redirect("/login");
  }
  else
  {
    next();
  }
});
module.exports = router;
