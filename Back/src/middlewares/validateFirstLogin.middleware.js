import jwt from 'jsonwebtoken';

export const validateFirstLogin = async (req,res,next) => {
  const {mustChangePassword} = req.data;

  if(mustChangePassword) {
    const payload = {
      email: user.email,
      purpose: 'password-reset-token',
      expire: '15m'
    }
  
    const token = jwt.sign(payload,process.env.SECRET_KEY, {expiresIn: '15m'});  


    res.setHeader("Authorization", `Bearer ${token}`);
    res.json({message: "ok"})
  }
  
  next();
}