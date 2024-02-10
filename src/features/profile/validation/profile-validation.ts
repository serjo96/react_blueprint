import Joi from "joi";

export const ProfileValidationSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
  name: Joi.string().label('Name'),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).label('Password'),
  confirmPassword: Joi.any().equal(Joi.ref('password')).label('Confirm password').messages({ 'any.only': '{{#label}} does not match' }),
});

