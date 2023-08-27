const Response = (res, status, msg, resFromDb) => {
  msg
    ? res.json({
        Status: status,
        Message: msg,
        resFromDb,
      })
    : res.json({
        Status: status,
        resFromDb,
      });
};

const setCookie = (res, msg, token, resFromDb) => {
  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      status: "Success",
      Message: msg,
      resFromDb,
    });
};

module.exports = { Response, setCookie };
