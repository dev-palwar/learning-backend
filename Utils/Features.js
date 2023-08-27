const Response = (res, status, msg, userData) => {
  res.json({
    Status: status,
    Message: msg,
    userData,
  });
};

const setCookie = (res, token, resFromDb) => {
  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      status: "Success",
      Message: "User registard",
      resFromDb,
    });
};

module.exports = { Response, setCookie };
