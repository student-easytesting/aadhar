const User = require("../models/user-model");

// *-------------------
// Home Logic
// *-------------------

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to Aadhar Website using router ");
  } catch (error) {
    console.log(error);
  }
};

const otp = async (req, res) => {
  let { phone, email } = req.body;
  if (email || phone) {
    let random = Math.floor(Math.random() * 10000);
    let randomNo = random.toString().padEnd(4, "0");
    return res.status(200).json({ otp: randomNo.toString() });
  }
  res.status(500).json("internal server error");
};

// *-------------------
// Registration Logic
// *-------------------

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, address, dob, phone, email } = req.body;
    let aadhar = 0;
    let userExist;
    do {
      let random = Math.floor(Math.random() * 1000000000000);
      let randomNo = random.toString().padEnd(12, "0");
      userExist = await User.findOne({ aadhar: randomNo });
      aadhar = randomNo;
    } while (userExist);
    const userCreated = await User.create({
      name,
      address,
      dob,
      phone,
      email,
      aadhar,
    });
    res.status(201).json({
      msg: "registration successful",
      Aadhar: userCreated.aadhar.toString(),
    });
  } catch (error) {
    // res.status(500).json("internal server error");
    console.log(error);
  }
};

module.exports = { home, register, otp };
