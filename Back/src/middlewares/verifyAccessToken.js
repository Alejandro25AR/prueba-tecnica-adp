import jwt from 'jsonwebtoken';

export const verifyAccessToken = (role) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    console.log(authHeader)

    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    if (typeof authHeader !== "string") {
      return res.status(400).json({ error: "Invalid authorization format" });
    }

    const token  = req.headers.authorization.replace('Bearer ','');
    const encodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    if(encodedToken.role !== role || encodedToken.purpose !== 'access-token'){
      
      return res.send('error');
    }

    req.idUser = encodedToken.id;
    
    next();
  }
}