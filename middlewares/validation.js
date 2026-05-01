import _ from 'lodash';
import HttpErrors from 'http-errors';

const validator = (schema,  path = 'body') => (req, res, next) => {
  try {
    const v = schema.validate(req[path], { abortEarly: false });

    if (v.error) {
      const errors = {};

      v.error.details.forEach((d) => {
        const errMessage = d.message.replace(/".*"/, '').trim();
        _.set(errors, d.path, errMessage);
      });

      throw new HttpErrors(422, {
        message: 'Validation failed',
        errors,
      });
    }

    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
}

export default validator;