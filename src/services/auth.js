const User = require("../models/user");

async function register(username, password) {
  const user = new User({
    username,
    hashedPassword: password,
  });
  await user.save();
}

async function login(username, password) {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Incorrect user or pass");
  } else {
    return user.comparePassword(password);
  }
}

module.exports = () => (req, res, next) => {
  req.auth = {
    register,
    login
  };
  next();
};
