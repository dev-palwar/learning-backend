const jwt = require("jsonwebtoken");
const users = require("../Models/users");
const { Response } = require("../Utils/Features");

const ifAuthenticated = async (req, res, next) => {
  if (!req.cookies.token) {
    return Response(res, "Failed", "Login first");
  }

  const decodedData = jwt.verify(req.cookies.token, "fasoildfjlksfoiwrlkfdS");
  req.user = await users.findById(decodedData._id);
  next();
};

module.exports = ifAuthenticated;