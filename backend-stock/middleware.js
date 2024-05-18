const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env.local" });
const jwtAuthKey = process.env.jwtAuthKey;

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const userIdBody = req.body.userId;
    if (userIdBody) {
      req.isLoggedIn = false;
      return res
        .status(401)
        .json({ message: " cannot proceed with this request " });
    }

    if (!token) {
      req.isLoggedIn = false;
      return res.status(401).json({ message: " please logIn" });
    }

    const decoded = await jwt.verify(token, jwtAuthKey);
    req.isLoggedIn = true;
    req.userId = decoded.userId;

    const newtoken = jwt.sign({ userId: decoded.userId }, jwtAuthKey, {
      expiresIn: "15d",
    });

    res.cookie("token", newtoken, { httpOnly: true });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token please logIn" });
  }
};

module.exports = { authenticateToken };
