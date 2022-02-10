const { Schema, model } = require("mongoose");
const { hashedPassword, comparePassword } = require("../services/util");

const userSchema = new Schema({
  username: { type: String, required: true, minlength: 3 },
  hashedPassword: { type: String, required: true },
});

userSchema.index(
  { username: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

userSchema.methods.comparePassword = async function (passWord) {
  return await comparePassword(passWord, this.hashedPassword);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("hashedPassword")) {
    this.hashedPassword = await hashedPassword(this.hashedPassword);
  }
  next();
});

const User = model("User", userSchema);

module.exports = User;
