const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSignup = async (req, res) => {

  const { name, email, password } = req.body;
  try {
    const userExits = await User.findOne({ email });
    if (userExits) {
      res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res
      .status(201)
      .json({ message: "User Registered Successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User Not Found" });
    }

    const validUser = bcrypt.compare(password, user.password);
    if (!validUser) {
      res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, email: email },
      process.env.JWT_TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res
      .status(201)
      .json({ message: "User Logged In Successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  userSignup,
  userLogin,
};
