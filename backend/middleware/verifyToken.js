import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token!" });
    }

    req.email = decoded.email;
    next();
  } catch (error) {
    console.log("Error in verify token: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
