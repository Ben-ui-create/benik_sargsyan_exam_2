import Joi from 'joi';

export default {
  create: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.number().min(1).max(9999).required(),
    genre: Joi.string().valid(
      "fiction",
      "non-fiction",
      "science",
      "history",
      "fantasy",
      "mystery",
      "biography",
      "other"
    ).required()
  }),

  update: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.number().min(1).max(9999).required(),
    genre: Joi.string().valid(
      "fiction",
      "non-fiction",
      "science",
      "history",
      "fantasy",
      "mystery",
      "biography",
      "other"
    ).required()
  }),
}

