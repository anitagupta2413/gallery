const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSignup = async (req, res) => {

  const { name, email, password } = req.body;
  try {
    const userExits = await User.findOne({ email });
    if (userExits) {
     return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // Enable Secure in production
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res
      .status(201)
      .json({ message: "User Registered Successfully"});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const validUser = await bcrypt.compare(password, user.password);
    if (!validUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, email: email },
      process.env.JWT_TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // Enable Secure in production
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });


    res
      .status(201)
      .json({ message: "User Logged In Successfully"});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userVerification = async (req, res) => {
  const authToken = req.cookies.authToken;
  if(!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(authToken, process.env.JWT_TOKEN_SECRET_KEY);
    res.status(200).json({ message: "Authenticated" });
  }
  catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

const userLogout = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: false, // Change to true in production
      sameSite: "Strict",
    });

    res.status(200).json({ message: "User Logged Out Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout Failed" });
  }
};


const userDelete = async (req, res) => {
  const authToken = req.cookies.authToken;

  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_TOKEN_SECRET_KEY);
    const userId = decoded.userId;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.clearCookie("authToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Delete User" });
  }
};


module.exports = {
  userSignup,
  userLogin,
  userVerification,
  userDelete,
  userLogout
};
