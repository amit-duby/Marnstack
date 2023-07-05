import ErrorHandler from "../utills/Errorhandler";

module.exports = (err, req, resp, next) => {
  err.status = err.status || 500;
  err.message = err.message || "Internal server error";
  // dublicate error........
  if (err.code === 11000) {
    const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  resp.status(err.status).json({
    success: false,
    message: err.message,
  });
};
