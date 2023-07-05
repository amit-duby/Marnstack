const sendToken = (data, status, resp) => {
  const token = data.getJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIES_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  resp.status(status).cookie("token", token, options).json({
    success: true,
    data,
    token,
    role: data.role,
  });
};
export default sendToken;
