import Joi from 'joi';

export default {
  create: Joi.object({
    name: Joi.string().alphanum().required(),
    page: Joi.number().integer().min(1).max(999).required(),
  }),

  update: Joi.object({
    name: Joi.string().alphanum().required(),
    page: Joi.number().integer().min(1).max(9999).required(),
  }),
}

