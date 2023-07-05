import mongoose from "mongoose";
import validator from "validator";
// import bcrypt from "bcrypt";
// import Jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter vaild email"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "does not increase 8 chr "],
    // select: false,
  },
  phone: {
    type: String,
    required: true,
    maxLength: [10, "does not excead 10 chr"],
  },
  address: {
    type: {},
    required: true,
  },
  answer: {
    type: String,
    require: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // resetPasswordToken: String,
  // resetPasswordExpireDate: Date,
});
// password hash.........
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });
// // match password.............
// userSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };
// // jwt token key..............
// userSchema.methods.getJwtToken = function () {
//   return Jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
//     expiresIn: process.env.EXPIRE_KEY,
//   });
// };

export default mongoose.model("User", userSchema);
