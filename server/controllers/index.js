const express = require("express");

const error = require("./error");

const router = express.Router();

// write your code
const COOKIE_NAME = "auth";
router.post("/login", (req, res) => {
    res.cookie(COOKIE_NAME, "logged-in", {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    })
    res.redirect("/");
});
router.post("/logout", (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect("/");
});
router.get("/auth-check", (req, res) => {
  const cookie = req.cookies && req.cookies[COOKIE_NAME];

  if (cookie === "logged-in") {
    return res.status(200).send("User is authenticated");
  }

  return res.status(401).send("User is NOT authenticated");
});
router.use(error.client);

module.exports = router;
