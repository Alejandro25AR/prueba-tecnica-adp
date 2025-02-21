import bcrypt from 'bcryptjs';

import { UserModel } from "../models/user.model.js";

export const checkCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await UserModel.findOne({ email });
  if (!user) {
    console.log("Usuario no encontrado");
    return res.send('Usuario no encontrado')
  }

  const correctPassword = await bcrypt.compare(password, user.password);
  if(!correctPassword){
    return res.send('Email o contraseña incorrecto');
  }

  req.data = {...user._doc};
  next();
}