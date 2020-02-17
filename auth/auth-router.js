const router = require("express").Router();

const bcrypt = require("bcryptjs");

// const authorize = require("./auth-required-middleware");

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// router.post("/login", authorize, (req, res) => {
//   let { username } = req.headers;
//   res.status(200).json({ message: `Welcome ${username}!` });
// });

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedin = true;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: `Invalid Credentials.` });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(400).send("Error logging out");
      } else {
        res.send("Logged out");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
