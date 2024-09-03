import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log('Cookies:', req.cookies); // Log cookies to verify the existence of auth-token
  
  const token = req.cookies["auth-token"];
  
  console.log('Token:', token); // Log the token to see if it's undefined or null

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(400)
        .json({ success: false, message: "Token is invalid" });
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    res.status(403).json({ success: false, message: "Server error" });
  }
};
