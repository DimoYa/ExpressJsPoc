const { Schema, model } = require("mongoose");
const { hashedPassword, comparePassword } = require("../services/util");

const userSchema = new Schema({
  username: { type: String, required: true, minlength: 3, unique: true },
  hashedPassword: { type: String, required: true },
});

userSchema.methods.comparePassword = async function(passWord) {
  return await comparePassword(passWord, this.hashedPassword);
};

userSchema.pre('save', function() {
  console.log('Saving', this);
});

const User = model("User", userSchema);

module.exports = User;
