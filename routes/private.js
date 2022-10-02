const express = require('express');
const router = express.Router();

const root = __dirname.replace('\\routes', "");

/* Require authentication */
router.all("*", (req, res, next) => {
  // Authentication
  console.log("LLLL")
  next();
});

/* GET private listings. */
router.get("/", (req, res, next) => {
  res.sendFile("private/index.html", {root: root})
});

module.exports = router;
