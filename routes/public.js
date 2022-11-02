const express = require('express');
const auth = require("../server/authentication")
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render("index", {loggedIn: req.session.loggedIn, username: req.session.username});
})

/* GET login page */
router.get("/login", (req, res) => {
  if(!req.session.loggedin || req.session.timeout <= Date.now())
    res.render("login");
  else
    res.redirect("/private/")
});

/* GET register page */
router.get("/register", (req, res) => {
  if(!req.session.loggedin || req.session.timeout <= Date.now())
    res.render("register");
  else
    res.redirect("/private/");
})

/* POST register form */
router.post("/register", (req, res) => {
  //VALIDATION
  if(req.body.username && req.body.password === req.body.passwordConfirmation && req.body.email){
    //Register user to database
    req.session.loggedin = true;
    req.session.username = req.body.username;
    req.session.email = req.body.email;
    req.session.timeout = Date.now() + 1800000; // Half Hour = 1 800 000 ms

    res.redirect("/private/");
  }else {
    //Check failed
    res.status(401).render("register", {
      username: req.body.username,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      email: req.body.email
    });
  }
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
