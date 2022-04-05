import mongoose from "mongoose";
import bcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcyrpt.compare(enteredPassword, this.password);
};

// Should hash the password on registration.
userSchema.pre("save", async function (next) {
  //conditional will check to see if the password is being modified so it wont update the password constantly.
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcyrpt.genSalt(10);
  this.password = await bcyrpt.hash(this.password, salt);
});
// enforces that the email string be lower case throughout, as if it isnt, a user with
// test@email.com and a user Test@email.com do not match, and you can end up with duplicate emails..
userSchema.pre("save", async function (next) {
  this.email = this.email.toLowerCase();
  next();
});

// Generate and hash password token
userSchema.methods.getResetPasswordToken = async function () {
  // Generate a token
  // this returns a buffer, we want to make it into a string
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hash token and set to resetPasswordToken field.
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expiration, 10 minutes
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const User = mongoose.model("User", userSchema);

export default User;
