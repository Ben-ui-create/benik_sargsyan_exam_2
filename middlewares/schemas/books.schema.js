import Joi from 'joi';

export default {
  create: Joi.object({
    title: Joi.string().alphanum().required(),
    author: Joi.string().alphanum().required(),
    year: Joi.number().min(1).max(9999).required(),
    genre: Joi.string().alphanum().required(),
  }),

  update: Joi.object({
    title: Joi.string().alphanum().required(),
    author: Joi.string().alphanum().required(),
    year: Joi.number().min(1).max(9999).required(),
    genre: Joi.string().alphanum().required(),
  }),
}

