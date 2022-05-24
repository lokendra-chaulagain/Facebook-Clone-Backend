const jwt = require("jsonwebtoken");
const createError = require("./error");

//Verify Token
const verifyToken = (req, res, next) => {
  //taking token from cookies
  const token = req.cookies.access_token;
  //if there is no token
  if (!token) {
    return next(
      createError(
        401,
        "You are unauthenticated because token not found in cookies"
      )
    );
  }
  //if there is token check it whether it is valid or not
  jwt.verify(token, process.env.JWT_SECRET, (error, userInfo) => {
    if (error) {
      return next(401, "Token is not valid");
    }
    req.user = userInfo;
    next();
  });
};

//Verify User
const verifyUser = (req, res, next) => {
  //to verify user ,user should be logged in first
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      //req.user.id is the id inside the jwt token
      //req.params.id is the id passed in the URL
      next();
    } else {
      //if id dont match and user is not admin
      return next(
        createError(403, "You are not authorized to perform this action !!")
      );
    }
  });
};

//Verify Admin
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(
        createError(403, "You are not authorized to perform this action !!")
      );
    }
  });
};

//export
module.exports = { verifyToken, verifyUser, verifyAdmin };
