const asyncHandler = require("../../middleware/async");

const updateAdmin = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server Error, ${error.message}` });
  }
});

module.exports = updateAdmin;
