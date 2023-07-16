const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  next();
  // const authorization = req.headers.authorization;
  // if (authorization) {
  //   // Bearer xxx => xxx
  //   const token = authorization.slice(7, authorization.length);
  //   jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
  //     if (err) {
  //       res.status(401).send({ message: "Invalid Token" });
  //     } else {
  //       // Do the next thing
  //       next();
  //     }
  //   });
  // } else {
  //   res.status(401).send({ message: "No Token" });
  // }
};
module.exports = {
  isAuth,
};
