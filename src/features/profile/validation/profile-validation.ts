import Joi from 'joi';

export const ProfileValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),
  name: Joi.string().label('Name'),
});
