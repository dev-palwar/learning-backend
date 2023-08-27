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
    setCookie(res, "Welcome", token, resFromDb);
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let resFromDb = await users.findOne({ email });

    if (resFromDb) {
      return Response(res, "Failed", "User already exists");
    }

    const hashedPass = await bcrypt.hash(password, 10);
    resFromDb = await users.create({ name, email, password: hashedPass });
    const token = jwt.sign({ _id: resFromDb._id }, "fasoildfjlksfoiwrlkfdS");

    setCookie(res, "user registard successfully", token);
  } catch (error) {
    Response(res, "Failed", "Fill all the details");
  }
};

const getProfile = async (req, res) => {
  const userData = req.user;
  Response(res, "Success", "", userData);
};

const logOut = (req, res) => {
  res.cookie("token", "", { expires: new Date(Date.now()) }).json({
    status: "Success",
    user: req.user,
  });
};

module.exports = { login, signup, getProfile, logOut };
