const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    default: false,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  aadhar: {
    type: String,
    require: true,
  },
});

//? secure the password with the bcrypt
// userSchema.pre("save", async function (next) {
//   // console.log("pre method", this);
//   const user = this;

//   if (!user.isModified("password")) {
//     next();
//   }

//   try {
//     const saltRound = await bcrypt.genSalt(10);
//     const hash_password = await bcrypt.hash(user.password, saltRound);
//     user.password = hash_password;
//   } catch (error) {
//     next(error);
//   }
// });

// // compare the password
// userSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// // json web token
// userSchema.methods.generateToken = async function () {
//   try {
//     return jwt.sign(
//       {
//         userId: this._id.toString(),
//         email: this.email,
//         isAdmin: this.isAdmin,
//       },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: "30d",
//       }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// define the model or the collection name
const User = new mongoose.model("User", userSchema);
module.exports = User;