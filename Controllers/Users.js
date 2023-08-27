const users = require("../Models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setCookie } = require("../Utils/Features");
const { Response, sendCookie } = require("../Utils/Features");

const login = async (req, res) => {
  const { email, password } = req.body;
  const resFromDb = await users.findOne({ email }).select("+password");

  if (!resFromDb) {
    return Response(res, "Failed", "Either email or password is wrong");
  }

  const passwordMatch = await bcrypt.compare(password, resFromDb.password);
  
  if (passwordMatch) {
    const token = jwt.sign({ _id: resFromDb._id }, "fasoildfjlksfoiwrlkfdS");
    setCookie(res, token, resFromDb);
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  let resFromDb = await users.findOne({ email });

  if (resFromDb) {
    return Response(res, "Failed", "User already exists");
  }

  const hashedPass = await bcrypt.hash(password, 10);
  resFromDb = await users.create({ name, email, password: hashedPass });
  const token = jwt.sign({ _id: resFromDb._id }, "fasoildfjlksfoiwrlkfdS");

  setCookie(res, token);
};

const getProfile = async (req, res) => {
  const userData = req.user;
  Response(res, "", userData);
};

module.exports = { login, signup, getProfile };
