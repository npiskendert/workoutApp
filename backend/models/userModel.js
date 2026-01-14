const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema({
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
});
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email: email });
  if (!user) {
    throw Error("Email not found");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid password");
  }
  return user;
};

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exist = await this.findOne({ email: email });
  if (exist) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPassword });

  return user;
};

module.exports = mongoose.model("User", userSchema);
