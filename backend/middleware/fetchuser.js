const jwt = require("jsonwebtoken"); //to generate the jwt token
// Read JWT secret from environment (set in backend/.env) with a safe fallback
const JWT_SECRET = process.env.JWT_SECRET || "jawadisagoodboy"; //secret key to sign the jwt token

const fetchuser = (req, res, next) => {
  //get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" }); //if there is no token then return 401 error
  }
  try {
    const data = jwt.verify(token, JWT_SECRET); //verifying the token
    req.user = data.user; //adding the user id to the req object
    next();
  } catch (error) {
    // If the token is expired, jwt throws an error with name 'TokenExpiredError'
    if (error && error.name === "TokenExpiredError") {
      return res
        .status(401)
        .send({ error: "Token expired, please login again" });
    }
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" }); //if the token is not valid then return 401 error
  }
};

module.exports = fetchuser; //exporting the fetchuser function
