// middleware/auth.middleware.js
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if the Authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // 2. Extract the token (Format is "Bearer <token_string>")
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret_key");

      // 4. Attach the real User ID to the request object
      // Now, NO ONE can fake their User ID!
      req.user = decoded.id;

      // 5. Let the request pass through to the controller
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If there's no token at all
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};