import Joi from 'joi';

export default {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
  }),

  register: Joi.object({
    name: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(32).required(),
    age: Joi.number().integer().min(18).max(100).required(),
  }),
}