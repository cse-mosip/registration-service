const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      // Bearer xxx => xxx
      const token = authorization.slice(7, authorization.length);
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          // Do the next thing
          if (!('user' in req)) req.user = {};
          req.user.email = decode.email_id;
          req.user.role = decode.role;
          next();
        }
      });
    } else {
      res.status(401).send({ message: "No Token" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error occured" });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!('user' in req)) {
      res.status(401).send({ message: "No user" });
      return;
    }
    const user = req.user;
    if (!('role' in user)){
      res.status(401).send({ message: "No role" });
      return;
    }
    if (user.role !== 'admin') {
      res.status(403).send({ message: "Not admin" });
      return;
    }
    next();
  } catch (err) {
    res.status(500).send({ message: "Error occured" });
  }
};

module.exports = {
  isAuth, isAdmin
};
