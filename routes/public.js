const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render("index", {loggedIn: req.session.loggedIn, username: req.session.username, });
})

/* GET login page */
router.get("/login", (req, res) => {
  res.render("login");
});

/* GET register page */
router.get("/register", (req, res) => {
  res.render("register");
})

/* POST login form */
router.post("/login", (req, res) =>{
  if(req.body.username === "root" && req.body.password === "root"){
    req.session.loggedin = true;
    req.session.username = req.body.username;
    req.session.timeout = Date.now() + 1800000; // Half Hour = 1 800 000 ms

    res.redirect("/private/")
  }else{
    res.status(401).render("login", {username: req.body.username, password: req.body.password, displayErrorMessage: true})
  }
});

module.exports = router;
