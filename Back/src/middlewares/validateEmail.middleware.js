import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email()
})

export const validateEmail = (req,res,next) => {
  const { email } = req.body;

  const isValidEmail = schema.validate({email}).error ?? true;

  if(!isValidEmail) {
    console.log("Email incorrecto");
    return res.send('Email o contraseña incorrecto')
  }

  next();
}