import jwt from "jsonwebtoken";

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const token = req.headers.dtoken; // custom header 'dtoken'

    //if not have token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Doctor token missing.",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //if they dont match
    if (!decoded?.id) {
      return res.status(403).json({
        success: false,
        message: "Invalid token payload.",
      });
    }

    // Attach doctor ID to request for controller use
    req.body = req.body || {};
    req.body.docId = decoded.id;

    next(); // Proceed to next middleware or route
  } catch (error) {
    console.error("AuthDoctor Error:", error.message);

    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Session expired. Please log in again."
          : "Invalid or expired token. Please log in again.",
    });
  }
};

export default authDoctor;
