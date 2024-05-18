const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schema/user");
require("dotenv").config({ path: ".env.local" });
const jwtAuthKey = process.env.jwtAuthKey;

async function login(req, res) {
  try {
    const { userEmail, userPassword } = req.body;

    const user = await userSchema.findOne({ userEmail });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.userId }, jwtAuthKey, {
      expiresIn: "15d",
    });

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function logout(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(400).json({ message: "token not found" });
    }
    res.cookie("token", "", { expires: new Date(0) });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error occurred during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

function generateUserId() {
  const currentDate = new Date();
  const year = currentDate.getFullYear() % 100;
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let uniqueString = "";
  for (let i = 0; i < 4; i++) {
    uniqueString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  const uniqueID = `US${year}${month}${day}${uniqueString}`;

  return uniqueID;
}

async function register(req, res) {
  try {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
      return res
        .status(401)
        .json({ message: "Please provide all the details" });
    }

    const indianTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = new userSchema({
      userId: await generateUserId(),
      userName: "Alon Musk",
      userEmail,
      userContactNumber: "+91-09827-46734",
      userPassword: hashedPassword,
      userRegistrartionDate: new Date(indianTime),
    });

    const createdUser = await newUser.save();

    if (!createdUser) {
      return res.status(401).json({ message: "Registration failed" });
    }

    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { login, logout, register };
