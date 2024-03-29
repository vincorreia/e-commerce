import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const authToken = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  try {
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = {
      email: user.email,
      id: user.id,
      isStaff: user.isStaff,
      name: user.name,
    };
    next();
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
};
