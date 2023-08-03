// import catchAsync from "./catchError.js";
// import ErrorHanler from "../utills/Errorhandler.js";
import JWT from "jsonwebtoken";
import Users from "../models/UserModels.js";

// export const Authuser = catchAsync(async (req, resp, next) => {
//   const { token } = User.cookies;
//   if (!token) {
//     return next(new ErrorHanler("invaild user token", 400));
//   }

//   const decoded = Jwt.verify(token, process.env.SECRET_KEY);
//   req.user = await User.findById(decoded.id);
//   next();
// });
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
// export const authroles = (...roles) => {
// return (req, resp, next) => {
//   if (!roles.includes(req.user.role)) {
//     return next(
//       new ErrorHanler(
//         `Role${req.user.role} user does not access this resorce`,
//         401
//       )
//     );
//   }
//   next();
export const isAdmin = async (req, res, next) => {
  const user = await Users.findById(req.user._id);
  if (user.role !== 1) {
    return res.status(401).send({
      success: false,
      message: "UnAuthorized Access",
    });
  } else {
    next();
  }
  // };
};
export default requireSignIn;
