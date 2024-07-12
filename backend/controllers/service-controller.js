const User = require("../models/user-model");

// *-------------------------------
//* getAllUsers Logic 📝
// *-------------------------------
const getUser = async (req, res) => {
  try {
    const { aadhar } = req.body;

    const userExist = await User.findOne({ aadhar });
    // console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Aadhar No " });
    }

    return res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

module.exports = getUser;
