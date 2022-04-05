const asyncHandler = require("../../middleware/async");
const User = require("../../models/userModel");

const createUser = asyncHandler(async (req, res) => {
  try {
    const newUser = await User.create(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error, ${error.message}` });
  }
});

module.exports = createUser;
