import users from "../models/UserModels.js";
import ErrorHandler from "../utills/Errorhandler.js";
import catchError from "../middleware/catchError.js";
import { hashPassword, comparePassword } from "../utills/Handdler.js";
// import sendToken from "../utills/verifytoken.js";
// import { hashPassword } from "./../utills/Handdler";
import JWT from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await users.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new users({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};
// Login usser................

export const LoginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await users.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    console.log(token);
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// testing

export const testing = catchError((req, resp, next) => {
  resp.send("done");
  next();
});

// forget password

export const forget_Password = catchError(async (req, resp, next) => {
  const { email, answar, newpassword } = req.body;
  if (!email) {
    return next(new ErrorHandler("email is require", 400));
  }
  if (!answar) {
    return next(new ErrorHandler("answar is require", 401));
  }
  if (!newpassword) {
    return next(new ErrorHandler("newpassword is require", 402));
  }
  const use = await users.findOne({
    email: req.body.email,
    answar: req.body.answar,
  });
  if (!data) {
    return next(new ErrorHandler("user not found", 403));
  }

  const user = await users.findByIdAndUpdate({ id: _id });
  resp.status(200).send({
    use,
    success: true,
    message: "forget successfully",
  });
});
