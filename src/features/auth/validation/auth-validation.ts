import Joi from 'joi';

export const loginValidationSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
  password: Joi.string().min(6).required().label('Password'),
  rememberMe: Joi.boolean(),
});

export const registrationValidationSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
  // harder password validation password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).label('Password'),
  password: Joi.string().min(6).required().label('Password'),
  confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' }),
});


export const resetPasswordValidationSchema = Joi.string().email({ tlds: { allow: false } }).required().label('Email');
