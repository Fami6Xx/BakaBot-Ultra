const express = require('express');
const router = express.Router();

const root = __dirname.replace('\\routes', "");

/* GET home page. */
router.get('/', function(req, res) {
  res.render("login");
})

/* GET login page */
router.get("/login", function (req, res) {
  res.render("login");
});

/* POST login form */
router.post("/login", function (req, res, next){
  if(req.body.username == "root" && req.body.password == "root"){
    req.session.loggedin = true;
    req.session.username = req.body.username;
    req.session.timeout = Date.now() + 1800000; // Half Hour = 1 800 000 ms

    res.redirect("/private/")
  }else{
    res.status(401).render("login", {userName: req.body.username, password: req.body.password, displayErrorMessage: true})
  }
});

module.exports = router;
