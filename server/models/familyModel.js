const { default: mongoose } = require("mongoose");

/**
 * This model is used to associate users with a family.
 */
const familySchema = mongoose.Schema(
  {
    family_name: {
      type: String,
      required: true,
    },
    // * An array of users
    family_members: [
      { user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
    ],
    // ? This is a single user who started the account
    account_owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Family = mongoose.model("Family", familySchema);

module.exports = Family;
