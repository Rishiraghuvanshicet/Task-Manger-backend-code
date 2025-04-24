const db = require("../store/db");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Auth Header:", authHeader); 
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized " });
  }

  const [scheme, token] = authHeader.split(" ");
  console.log("Scheme:", scheme);
  console.log("Token:", token); 

  if (scheme !== "Bearer" || !token ) {
    return res.status(401).json({ message: "Unauthorized " });
  }

  req.userId = db.sessions[token];
  console.log(db)
  next();
};

module.exports = authMiddleware;
