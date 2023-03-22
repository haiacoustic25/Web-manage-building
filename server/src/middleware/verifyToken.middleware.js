const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  const token = request.header("Authorization");

  if (!token) return response.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.SECRET_JWT);
    next();
  } catch (err) {
    return response.status(400).send("Invalid Token");
  }
};
