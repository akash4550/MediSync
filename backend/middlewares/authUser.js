import jwt from 'jsonwebtoken';//it is used to give authentication at the time of login by generating token and token is match with jwt secret key

const authUser = async (req, res, next) => {

  //middleware to check authorisatity of user
  try {
    //get token
    const authHeader = req.headers.authorization;
    //if dont get header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
    //token
    const token = authHeader.split(' ')[1];
    //compare token with jwt secret key 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   // console.log("Decoded JWT:", decoded); 

    // Adjust this line based on payload:
    req.userId = decoded.id || decoded.user;

    next();//call next middleware
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
