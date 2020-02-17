// const users = require("../users/users-model");
// const bcrypt = require("bcryptjs");

// module.exports = (req, res, next) => {
//   const { username, password } = req.headers;

//   if (!(username && password)) {
//     res.status(401).json({ message: "Invalid Credentials" });
//   } else {
//     users
//       .findBy({ username })
//       .first()
//       .then(_user => {
//         if (_user && bcrypt.compareSync(password, _user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: "invalid credentials" });
//         }
//       })
//       .catch(err => {
//         res.status(500).json({ message: err });
//       });
//   }
// };

module.exports = (req, res, next) => {
  if (req.session && (req.session.loggedin === true)) {
    next();
  } else {
    res.status(400).json({ message: "Cannot access" })
  }
}
