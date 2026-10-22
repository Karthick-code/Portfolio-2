import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No authorization token provided.",
    });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "super_secret_developer_portfolio_jwt_key_2025";

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token is invalid or has expired.",
    });
  }
};
