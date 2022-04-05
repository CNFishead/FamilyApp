const asyncHandler = require("../../middleware/async");

const deleteUser = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error, ${error.message}` });
  }
});

module.exports = deleteUser;
