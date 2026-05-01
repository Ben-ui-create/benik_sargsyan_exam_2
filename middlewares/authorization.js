import HttpErrors from 'http-errors';
import User from '../models/users.js';

export default (req, res, next) => {
  try {
    const token = req.headers?.authorization || null;

    if (!token) {
      next(HttpErrors(401));
      return;
    }

    const decrypted = User.decrypt(token);

    if (!decrypted || !decrypted?.userId) {
      next(new HttpErrors(401));
      return;
    }

    req.userId = decrypted?.userId;

    next();
  } catch (e) {
    next(HttpErrors(401));
  }
}

